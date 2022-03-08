// The categories of tweets which should be displayed are stored in a set in active_categories.
var active_categories;

/* Helper function to read the categories from the data structure stored with the chrome.storage api
and use them to update the active categories set. */
function readCategoryMap(categoryMap){
  active_categories = new Set();
  for(category of categoryMap) {
    if(category[1]){
      active_categories.add(category[0]);
    }
  }
  return active_categories;
}

// When the script loads (when the user loads twitter), the script needs to load the current categories.
chrome.storage.sync.get(['categoryMap'], (result) => {
  active_categories = readCategoryMap(result.categoryMap);
  console.log("categories: ",active_categories);
})

// Once the categories have loaded, add a listener to update the categories whenever they change
chrome.storage.onChanged.addListener(function(changes, area){
  if(area === 'sync' && changes.categoryMap?.newValue) {
    active_categories = readCategoryMap(changes.categoryMap.newValue);
    console.log("categories:", active_categories);
  }
})


// The tweet objects which have been processed are stored in a set
var parsedTweets = new Set();

// The text of tweets which have been processed are mapped to their scores (or null if they've not recieve a score yet)
var tweetScores = new Map();

/* This function finds the text within a tweet by looking for <span> tags since by inspection these all text in
tweets are within span tags. */
function getTweetText(tweet){
    var spans = tweet.getElementsByTagName("span");

    var text = "";

    for (var j = 3; j < spans.length - 9; ++j){
        text = text + spans[j].innerText + " ";
    }

    return text;
}

function parseTweets(tweets){
  // Add the tweets to a set
  var newTweets = new Set();
  for (const tweet of tweets){
    newTweets.add(tweet);
  }

  // Filter any tweets which have already been parsed out of the input tweets
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

  // Loop through all the new tweets and add their score to the tweetScores map.
  for (tweet of newTweets){
    var text = getTweetText(tweet);

    if (!tweetScores.has(text)){
        //tweetScores.set(text, null);
        
        // Send http request to classify text and update the mapping to the result of the response
        requestScore(text);
    }
  }

  return newTweets;
}

/* Helper function to convert the categories from their name (recieved from the server in the http responce) to the
integer representation (used by active_categories and the other parts of the extension). */
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

/* This function loops through the tweets visible on the screen and based on their category and the active category,
determines whether or not they should be displayed. */
function displayTweets(tweets){
    for (var tweet of tweets){
        var text = getTweetText(tweet);
        var category = tweetScores.get(text);

        // Determine whether or not to display tweet
        if (category == null){ // If the tweet has not been classified yet, we display it
          tweet.style.display = "flex";
        } else{
          // If the tweet has been categorised, only display it if the category is one of the active_categories
          if (!active_categories.has(categoryToNumber(category))){
            tweet.style.display = "none";
          } else{
            tweet.style.display = "flex";
            if (tweet.style.display == "none"){
              console.log(text);
            }
          }
        }
    }
}

// This function sends an http request to the server to recieve category scores for the input text
// It then updates the tweetScores map with its category.
function requestScore(text){
    // Create http request object
    const xhr = new XMLHttpRequest();
    const params = "text=" + text;

    /* We use POST requests. Since we do not have a server, the user is required to host it locally
    In a published version of the extension, we would expect there to be a remote server to handle the requests.
    All this would require is changing this ip address to match the server's. */
    xhr.open("POST", "http://127.0.0.1:5000/score", true);

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Set the function to be called once the http responce has been recieved
    xhr.onload = function(){ 
        if (xhr.status == 200){
          var data = JSON.parse(xhr.responseText);

          // Work out which category the tweet scores greatest in
          var category = null;
          var max = -Infinity;
          for (const [key, value] of Object.entries(data.category_scores)){
            if (value > max){
              max = value;
              category = key;
            }
          }

          // Update the tweetScores map with the category
          tweetScores.set(text, category);

          // If a responce is not recieved, log this in the browser.
        } else if(xhr.status == 404){
            console.log("Error: Did not recieve classification responce.");            
        }
    }

    // Send the http request
    xhr.send(params);
}

/* This function gets all the tweets currently making up the html page of the twitter feed then passes them
to the parseTweets() and displayTweets() function. */
function run(){
    var tweets = document.querySelectorAll('[data-testid="tweet"]');
    parseTweets(tweets);
    displayTweets(tweets);
} 

/* The run() function is called very frequently so that the display reacts to the tweets in the html changing or the
currently active categories changing. */
setInterval(run, 10);