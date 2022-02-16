
moodDict = {"anxiety": 0, "sadness": 0, "anger": 0, "happiness": 0};

class questionResponse {
    constructor(questionAnswer, questionNumber) {
        this.questionNumber = questionNumber;
        this.questionAnswer =  questionAnswer;
    }
}

answerList = [];

// example questions <- actual log will be done by some sort of interface with the frontend
// --------------------------------------
const q0 = new questionResponse(0.2, 0);
answerList.push(q0);
const q1 = new questionResponse(0.4, 1);
answerList.push(q1);
const q2 = new questionResponse(0.5, 2);
answerList.push(q2);
const q3 = new questionResponse(0.5, 3);
answerList.push(q3);
// --------------------------------------

console.log(answerList);



function updateMoodValues(anx, sad, ang, hap) {
    moodDict.anxiety += anx;
    moodDict.sadness += sad;
    moodDict.anger += ang;
    moodDict.happiness += hap;
}

function questionUpdateValues(qNum, val) {
    switch (qNum) {
        case 0: // How much is going through your head?
            updateMoodValues(val * 1.5, 0, val * 1.0, val * 0.5); 
            break;
        case 1: // Did you find your day enjoyable?
            updateMoodValues(1 * (0.7 - val), 1.5 * (0.8 - val), 0.5 * (0.5 - val), val * 2);
            break;
        case 2: // How hungry have you been feeling?
            updateMoodValues(0.3 * Math.abs(0.5 - val), 0.2 * Math.abs(0.5 - val), 0, 0);
            break;
        case 3: // How sociable are you today compared to usual?
            updateMoodValues(1.5 * (1 - val), 1.1 * (1 - val), 1 * (0.7 - val), val * 1.0);
            break;

            // many more cases (as many as questions)

        default:
            console.log("invalid question number");
    }
}



// evaluate every question response
for (const qr of answerList) {
    questionUpdateValues(qr.questionNumber, qr.questionAnswer);
}
 

console.log(moodDict);


// find argmax of mood
var largestMoodScore = 0;
var predictedMood = "";
for(let mood in moodDict) {
    if (largestMoodScore < moodDict[mood]) {
        predictedMood = mood;
        largestMoodScore = moodDict[mood];
    }
}


console.log("Predominant mood is: " + predictedMood)

