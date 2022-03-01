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
    $('#predicted-mood').hide(); 
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
    
    function end_test() {
      var predMoodOut = predictMood(answerList);
      var newCategoryList = generateCategoryLists(predMoodOut);

      document.getElementById("front-page").style.visibility = "hidden";
      document.getElementById("slider").style.visibility = "hidden";
      document.getElementById("value").style.visibility = "hidden";
      // You successfully submitted all your answers! Categories have been updated in the other tab.
      if (predMoodOut == "anxiety") {
        $('#predicted-mood').text('Predicted Mood: Anxiety');
        $('#end-message').text('Some days can contain a lot of stress in them, it’s important to take some time out to relax though. We recommend enjoying something beautiful such as music or art, or maybe taking in something entertaining or inspiring.');
      } else if (predMoodOut == "sadness") {
        $('#predicted-mood').text('Predicted Mood: Sadness');
        $('#end-message').text('You might be feeling a bit down at the moment and so we hope you feel better soon. In the meantime we recommend some light or silly entertainment, we also recommend appreciating something pretty such as some art or music.');
      } else if (predMoodOut == "anger") {
        $('#predicted-mood').text('Predicted Mood: Anger');
        $('#end-message').text('Sometimes things can get quite tense and we need to find some space and time to keep calm or work through those feelings. We’ve suggested you enjoy something funny or entertaining, or something intellectually stimulating to take your mind off things.');
      } else if (predMoodOut == "happiness") {
        $('#predicted-mood').text('Predicted Mood: Happiness');
        $('#end-message').text('It’s great that you’re feeling good! We’ve recommended that you try and use now to take in some news, or maybe engage with something more intellectually challenging such as some political or academic content.');
      }
      $('#next-question').slideUp();
      $('#end-page').slideDown();
      $('#predicted-mood').slideDown();
      
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

    $('#restart').click(function() {
      current_index = 0;
      answerList = [];
	    $('#next-question').slideDown();
      document.getElementById("front-page").style.visibility = "visible";
      $('#end-page').hide();
      $('#predicted-mood').hide();
      change_question();
    });
  }

              
