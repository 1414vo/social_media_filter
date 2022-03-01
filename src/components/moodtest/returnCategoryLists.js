// Need interface for getting mood from the moodPredict.js script

//userMood = "happiness"; // MAKE THIS ACTUAL INTERACT WITH OTHER SCRIPTS
import CategoryType from "../../models/CategoryType";
export function generateCategoryLists(userMood) {
    var primaryList = [];
    var secondaryList = [];
    var avoidList = [];

    var categories = [CategoryType.Politics, CategoryType.Entertainment, CategoryType.Art, CategoryType.Lifestyle , CategoryType.Music, CategoryType.Academic, CategoryType.Comedy, CategoryType.Inspirational, CategoryType.News, CategoryType.Business, CategoryType.Tech];


    function intersection(arr1, arr2) {
        var returnList = [];
        for (const val of arr1) {
            if (arr2.includes(val)) {
                returnList.push(val);
            }
        }
        return returnList;
    }

    function difference(arr1, arr2) {
        var intersectionSet = intersection(arr1, arr2);
        var differenceSet = [];

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
            primaryList = [CategoryType.Music, CategoryType.Art, CategoryType.Entertainment, CategoryType.Inspirational];
            avoidList = [CategoryType.News, CategoryType.Politics, CategoryType.Business, CategoryType.Lifestyle];
            secondaryList = difference(avoidList, difference(categories, primaryList));
            break;

        case "sadness":
            primaryList = [CategoryType.Music, CategoryType.Art, CategoryType.Entertainment, CategoryType.Comedy, CategoryType.Academic];
            avoidList = [CategoryType.News, CategoryType.Politics, CategoryType.Business];
            secondaryList = difference(avoidList, difference(categories, primaryList));
            break;

        case "anger":
            primaryList = [CategoryType.Music, CategoryType.Entertainment, CategoryType.Comedy, CategoryType.Academic];
            avoidList = [CategoryType.Inspirational];
            secondaryList = difference(avoidList, difference(categories, primaryList));
            break;

        case "happiness":
            primaryList = [CategoryType.News, CategoryType.Politics, CategoryType.Academic, CategoryType.Business];
            avoidList = [CategoryType.Lifestyle];
            secondaryList = difference(avoidList, difference(categories, primaryList));
            break;

        default:
            console.log("MOOD NOT DEFINED IN SWITCH STATEMENT");
    }

    console.log("Primary List: " + primaryList);
    console.log("Secondary List: " + secondaryList);
    console.log("Avoiding: " + avoidList);
    return {"primaryList": primaryList, "secondaryList": secondaryList, "avoidList": avoidList};
}

//generateCategoryLists(userMood);
