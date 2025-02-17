// Main file for implementing the mood test

import $ from 'jquery';
import {predictMood} from "./MoodPredict.js";
import {generateCategoryLists} from "./returnCategoryLists.js";

export default class MoodTest {
    constructor() {
        this.questions = [];
    }
}

// Inserts question at end of array
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

    // Initialization
    var self = this;
    $('#predicted-mood').hide(); 
    $('#end-page').hide();
    var question_container = $('<div>').attr('id', 'question').insertAfter('#moodtest-name');
  
    // Manipulates slider and button text when question is changed
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
    
    // Called after the last question is answerd
    function end_test() {
      var predMoodOut = predictMood(answerList);
      var newCategoryList = generateCategoryLists(predMoodOut);

      // Hides parts used for showing questions
      document.getElementById("front-page").style.visibility = "hidden";
      document.getElementById("slider").style.visibility = "hidden";
      document.getElementById("value").style.visibility = "hidden";
      
      // Different colours and prompts for each mood
      if (predMoodOut == "anxiety") {
        $('#predicted-mood').text('Predicted Mood: Anxiety');
        $('#end-message').text('Some days can contain a lot of stress in them, it’s important to take some time out to relax though. We recommend enjoying something beautiful such as music or art, or maybe taking in something entertaining or inspiring.');
        updateBackgroundColor("#99d9ea");
      } else if (predMoodOut == "sadness") {
        $('#predicted-mood').text('Predicted Mood: Sadness');
        $('#end-message').text('You might be feeling a bit down at the moment and so we hope you feel better soon. In the meantime we recommend some light or silly entertainment, we also recommend appreciating something pretty such as some art or music.');
        updateBackgroundColor("#d3eedd");
      } else if (predMoodOut == "anger") {
        $('#predicted-mood').text('Predicted Mood: Anger');
        $('#end-message').text('Sometimes things can get quite tense and we need to find some space and time to keep calm or work through those feelings. We’ve suggested you enjoy something funny or entertaining, or something intellectually stimulating to take your mind off things.');
        updateBackgroundColor("#c8e0e0");
      } else if (predMoodOut == "happiness") {
        $('#predicted-mood').text('Predicted Mood: Happiness');
        $('#end-message').text('It’s great that you’re feeling good! We’ve recommended that you try and use now to take in some news, or maybe engage with something more intellectually challenging such as some political or academic content.');
        updateBackgroundColor("#ffffbf");
      }
      
      // Alters display
      $('#next-question').slideUp();
      $('#end-page').slideDown();
      $('#predicted-mood').slideDown();
      navigator.serviceWorker.controller.postMessage({"completed": true});

      $('#moodtest').trigger("end", newCategoryList);
    }

    function updateBackgroundColor(color) {
      if(navigator.serviceWorker.controller){
        navigator.serviceWorker.controller.postMessage({"color": color});
      }
    }

    // Display intro (question 0)
    var current_index = 0;
    var answerList = [];
    change_question();
  
    // Actions to be taken when the "next question" button is clicked
    $('#next-question').click(function() {
      if (current_index > 0) { 
        console.log(current_index, slider.value);
        answerList.push(new questionResponse(parseInt(slider.value), current_index)); 
      } 
      // Resets slider values
      slider.value = 10;
      output.innerHTML = 10;
      if (current_index >= 8 && current_index <= 10) { 
        end_test();
      } else {
        // Choose a random question from specified list and update index
        current_index = self.questions[current_index].next_id[Math.floor(Math.random() * self.questions[current_index].next_id.length)];
        change_question();
      }
    });

    // Actions to be taken when the "restart" button is clicked
    $('#restart').click(function() {
      current_index = 0;
      answerList = [];
	    $('#next-question').slideDown();
      document.getElementById("front-page").style.visibility = "visible";
      $('#end-page').hide();
      $('#predicted-mood').hide();
      navigator.serviceWorker.controller.postMessage({"completed": false});
      change_question();
    });
  }

              
