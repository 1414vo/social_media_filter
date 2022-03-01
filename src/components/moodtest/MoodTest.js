import $ from 'jquery';
import {predictMood} from "./MoodPredict.js";
import {generateCategoryLists} from "./returnCategoryLists.js";
export default class MoodTest {
    constructor() {
        this.questions = [];
    }
}

// inserts question at end of array
MoodTest.prototype.add_question = function(question) {
    this.questions.splice(this.questions.length, 0, question);
}

export class questionResponse {
    constructor(questionAnswer, questionNumber) {
        this.questionNumber = questionNumber;
        this.questionAnswer =  questionAnswer;
    }
}

MoodTest.prototype.display = function(container) {
    var slider = document.getElementById("slider");
    var output = document.getElementById("value");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
      output.innerHTML = this.value;
    }

    var self = this;
    $('#end-page').hide();
    var question_container = $('<div>').attr('id', 'question').insertAfter('#moodtest-name');
  
    function change_question() {
      self.questions[current_index].display(question_container);
      if (current_index >= 8 && current_index <= 10) { 
          $('#next-question').text('Submit');
      } else if (current_index > 0) {
          $('#next-question').text('Next');
          document.getElementById("slider").style.visibility = "visible";
          document.getElementById("value").style.visibility = "visible";
      } else {
          $('#next-question').text('Start');
          document.getElementById("slider").style.visibility = "hidden";
          document.getElementById("value").style.visibility = "hidden";
      }
    }
    
    async function end_test() {
      document.getElementById("front-page").style.visibility = "hidden";
      document.getElementById("slider").style.visibility = "hidden";
      document.getElementById("value").style.visibility = "hidden";
      $('#end-message').text('You successfully submitted all your answers! Categories have been updated in the other tab.');
      $('#next-question').slideUp();
      $('#end-page').slideDown();

      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // ***
      
      var predMoodOut = predictMood(answerList);
      if (predMoodOut == "anxiety") {
        chrome.scripting.executeScript({ 
          target: { tabId: tab.id }, 
          function: () => {document.body.style.backgroundColor = '#87ceeb';}, // Sky Blue
        });
      } else if (predMoodOut == "sadness") {
        chrome.scripting.executeScript({ 
          target: { tabId: tab.id }, 
          function: () => {document.body.style.backgroundColor = '#d3eede';}, // Gentle Green 
        });
      } else if (predMoodOut == "anger") {
        chrome.scripting.executeScript({ 
          target: { tabId: tab.id }, 
          function: () => {document.body.style.backgroundColor = '#c8e0e0';}, // Skylight
        });
      } else if (predMoodOut == "happiness") {
        chrome.scripting.executeScript({ 
          target: { tabId: tab.id }, 
          function: () => {document.body.style.backgroundColor = '#ffffbf';}, // Pale Yellow
        });
      }
      var newCategoryList = generateCategoryLists(predMoodOut);
      $('#moodtest').trigger("end", newCategoryList);
    }
    
    // display intro
    var current_index = 0;
    var answerList = [];
    change_question();
  
    $('#next-question').click(function() {
      if (current_index > 0) { 
        console.log(current_index, slider.value);
        answerList.push(new questionResponse(parseInt(slider.value), current_index)); 
      } 
      slider.value = 10;
      output.innerHTML = 10;
      if (current_index >= 8 && current_index <= 10) { 
        end_test();
      } else {
        current_index = self.questions[current_index].next_id[Math.floor(Math.random() * self.questions[current_index].next_id.length)];
        change_question();
      }
    });
  }

              
