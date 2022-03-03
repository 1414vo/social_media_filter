var active_categories;
chrome.storage.sync.get(['categoryMap'], (result) => {
  active_categories = readCategoryMap(result.categoryMap);
  console.log("categories: ",active_categories);
}) // Set of categories currently active

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     // Recieved a message, for now assume this message tells us to change categories
//     active_categories = request.categories;
//     console.log(active_categories);
//   }
// );

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
        requestScore(text, function(scores){
          tweetScores.set(text, scores);
          console.log(text, tweetScores.get(text));
        });
        // TEMP: randomly decide whether to display tweets
        //tweetScores.set(text, Math.random() > 0.5);
    }

    //document.body.insertAdjacentHTML("beforebegin", "<p>" + text + "</p>");
  }

  return newTweets;
}

function displayTweets(tweets){
    for (tweet of tweets){
        var scores = tweetScores.get(getTweetText(tweet));

        // Determine whether or not to display tweet
        if (scores == null){
          tweet.style.display = "Block";
        } else{
          var category = null;
          var max = -Infinity;
          for (const [key, value] of Object.entries(scores.category_scores)){
            if (value > max){
              max = value;
              category = key;
            }
          }

          //console.log(category + " " + active_categories.has(category));

          if (!active_categories.has(categoryToNumber(category))){
            tweet.style.display = "None";
          } else{
            tweet.style.display = "Block";
          }
        }

        // // TEMP
        // if (!score){
        //     //tweet.innerText = "HIDDEN";
        //     tweet.style.display = "None";            
        // }
        
        // For now, change text
    }
}
function categoryToNumber(category) {
  switch(category){
    case "Politics":
      return 0;
    case "Entertainment":
      return 1;
    case "Art": 
      return 2;
    case "Music":
      return 3;
    case "Lifestyle":
      return 4;
    case "Academic":
      return 5;
    case "Comedy":
      return 6;
    case "Inspirational":
      return 7;
    case "News":
      return 8;
    case "Business":
      return 9;
    case "Tech":
      return 10;
    case "Sports":
      return 11;
    default:
      return 5;
  }
}
function requestScore(text, set_score_func){
    const xhr = new XMLHttpRequest();
    const params = "text=" + text;

    //xhr.open("GET", "http://127.0.0.1:5000/time");
    xhr.open("POST", "http://127.0.0.1:5000/score");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "true");

    xhr.onload = function(){
    //xhr.onreadystatechange = function(){      
        if (xhr.status == 200){
          //console.log(xhr.responseText);
          var data = JSON.parse(xhr.responseText);
          //console.log(data);

          set_score_func(data);

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
function readCategoryMap(categoryMap){
  active_categories = new Set();
  for(category of categoryMap) {
    if(category[1]){
      active_categories.add(category[0]);
    }
  }
  return active_categories;
}
setInterval(run, 10);
chrome.storage.onChanged.addListener(function(changes, area){
  if(area === 'sync' && changes.categoryMap?.newValue) {
    active_categories = readCategoryMap(changes.categoryMap.newValue);
    console.log("categories:", active_categories);
  }
})
//window.onchange = run;