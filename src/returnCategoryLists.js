// Need interface for getting mood from the moodPredict.js script

userMood = "happiness"; // MAKE THIS ACTUAL INTERACT WITH OTHER SCRIPTS

primaryList = [];
secondaryList = [];
avoidList = [];

categories = ["Politics", "Entertainment", "Art", "Music", "Lifestyle", "Academic", "Comedy", "Inspirational", "News", "Business", "Tech"];


function intersection(arr1, arr2) {
    returnList = [];
    for (const val of arr1) {
        if (arr2.includes(val)) {
            returnList.push(val);
        }
    }
    return returnList;
}

function difference(arr1, arr2) {
    intersectionSet = intersection(arr1, arr2);
    differenceSet = [];

    for (const val of arr1) {
        if (!intersectionSet.includes(val)) {
            differenceSet.push(val);
        }
    }
    
    for (const val of arr2) {
        if (!intersectionSet.includes(val)) {
            differenceSet.push(val);
        }
    }

    return differenceSet;
}

switch (userMood) {
    case "anxiety":
        primaryList = ["Music", "Art", "Entertainment", "Inspirational"];
        avoidList = ["News", "Politics", "Business", "Lifestyle"];
        secondaryList = difference(avoidList, difference(categories, primaryList));
        break;

    case "sadness":
        primaryList = ["Music", "Art", "Entertainment", "Comedy", "Academic"];
        avoidList = ["News", "Politics", "Business"];
        secondaryList = difference(avoidList, difference(categories, primaryList));
        break;

    case "anger":
        primaryList = ["Music", "Entertainment", "Comedy", "Academic", "Politics"];
        avoidList = ["Inspirational"];
        secondaryList = difference(avoidList, difference(categories, primaryList));
        break;

    case "happiness":
        primaryList = ["News", "Politics", "Academic", "Comedy", "Business"];
        avoidList = ["Lifestyle"];
        secondaryList = difference(avoidList, difference(categories, primaryList));
        break;

    default:
        console.log("MOOD NOT DEFINED IN SWITCH STATEMENT");
}

console.log("Primary List: " + primaryList);
console.log("Secondary List: " + secondaryList);
console.log("Avoiding: " + avoidList);