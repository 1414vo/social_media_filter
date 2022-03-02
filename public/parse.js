var active_categories; // Set of categories currently active

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    // Recieved a message, for now assume this message tells us to change categories
    active_categories = request.categories;
    console.log(active_categories);
  }
);

var parsedTweets = new Set();

var tweetScores = new Map();

function getTweetText(tweet){
    var spans = tweet.getElementsByTagName("span");

    var text = "";

    for (var j = 3; j < spans.length - 9; ++j){
        text = text + spans[j].innerText + " ";
    }

    return text;
}

function parseTweets(tweets){
  var newTweets = new Set();
  for (const tweet of tweets){
    newTweets.add(tweet);
  }

  if (parsedTweets == null){
    parsedTweets = newTweets;
  } else {
    parsedTweets.forEach(function(tweet){ 
      newTweets.delete(tweet); 
    });

    newTweets.forEach(function(tweet){
      parsedTweets.add(tweet); 
    });
  }

  for (tweet of newTweets){
    var text = getTweetText(tweet);

    if (!tweetScores.has(text)){
        tweetScores.set(text, null);
        
        // TODO: Send http request to classify text
        requestScore(text);

        // TEMP: randomly decide whether to display tweets
        tweetScores.set(text, Math.random() > 0.5);
    }

    //document.body.insertAdjacentHTML("beforebegin", "<p>" + text + "</p>");
  }

  return newTweets;
}

function displayTweets(tweets){
    for (tweet of tweets){
        var score = tweetScores.get(getTweetText(tweet));

        // Determine whether or not to display tweet

        // TEMP
        if (!score){
            //tweet.innerText = "HIDDEN";
            tweet.style.display = "None";            
        }
        
        // For now, change text
    }
}

function requestScore(text){
    const xhr = new XMLHttpRequest();
    const params = "text=" + "test";

    //xhr.open("GET", "http://127.0.0.1:5000/time");
    xhr.open("POST", "http://127.0.0.1:5000/score");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "true");

    xhr.onload = function(){
    //xhr.onreadystatechange = function(){      
        if (xhr.status == 200){
          console.log(xhr.responseText);
          var data = JSON.parse(xhr.responseText);
          console.log(data);

        } else if(xhr.status == 404){
            console.log("Error: No classification recieved!");            
        }
    }

    xhr.send(params);
    //xhr.send();

    //xhr.onerror = function(){...}

    //xhr.onprogress = function(e){...} - probably don't need to react to progress, responces should be small
}

function run(){
    var tweets = document.querySelectorAll('[data-testid="tweet"]');
    parseTweets(tweets);
    displayTweets(tweets);
}

setInterval(run, 10);
//window.onchange = run;