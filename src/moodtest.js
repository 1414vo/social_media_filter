
import {generateCategoryLists} from "./components/moodtest/returnCategoryLists.js";
import {predictMood} from "./components/moodtest/moodPredict.js"; 

moodDict = {"anxiety": 0, "sadness": 0, "anger": 0, "happiness": 0};

class questionResponse {
    constructor(questionAnswer, questionNumber) {
        this.questionNumber = questionNumber;
        this.questionAnswer =  questionAnswer;
    }
}

answerList = [];

const questions = [{
    next_id: [1, 2],
	question: "Answer 5 questions for a better Twitter experience! :)", // Intro
	description: "Click the Start button to begin.",
  },
  {
    next_id: [3, 4],
	question: "Did you have any sleeping difficulties (e.g., difficulty to fall asleep, stay asleep or get back to sleep after waking up early)?", // Q1
	description: "1: can't fall asleep, 10: slept very well"
  },
  {
    next_id: [3, 4], 
	question: "How is your appetite today?", // Q2
	description: "1: extremely poor, 10: extremely good",
  },
  {
    next_id: [5, 6, 7],
	question: "How tired do you feel when you are trying to work?", // Q3
	// alternative: little energy
	description: "1: extremely tired, 10: not tired at all",
  },
  {
    next_id: [5, 6, 7],
	question: "How difficult is it to concentrate on what you are doing?", // Q4
	description: "1: extremely difficult, 10: not difficult at all"
  },
  {
    next_id: [8, 9, 10],
	question: "How easy do you find it to relax today?", // Q5
	description: "1: not easy at all, 10: extremely easy"
  },
  {
    next_id: [8, 9, 10],
	question: "How much interest or pleasure do you find in doing things today?", // Q6
	description: "1: no interest or pleasure at all, 10: a lot of interest or pleasure",
  },
  {
    next_id: [8, 9, 10],
	question: "How sociable are you today when compared to a typical day?", // Q7
	description: "1: a lot less sociable, 10: a lot more sociable"
  },
  {
    next_id: [11],
	question: "Do you feel hot in the upper part of your body?", // Q8
	description: "1: extremely hot, 10: not hot at all"
  },
  {
    next_id: [11],
	question: "Are your muscles stiff and tight?", // Q9
	description: "1: extremely stiff and tight, 10: not stiff and tight at all",
  },
  {
    next_id: [11],
	question: "Are you experiencing a headache or any other kind of pain?", // Q10
	description: "1: very severe headache or pain, 10: no headache or pain at all,"
  },
  {
    next_id: [],
	question: "Now measure your heartbeat for 15 seconds. How many heartbeats did you count?", // Q11
	description: "1: between 1 and 5, 10: between 46 and 50"
  },
];

class MoodTest {
  constructor() {
    this.questions = [];
  }
}

class Question {
  constructor(next_id, question, description) {
 	this.next_id = next_id;
	this.question = question;
	this.description = description;
    /*
	this.user_choice_index = null;
    var len = choices.length;
    for (var i = 0; i < len; i++) {
      this.choices[i] = choices[i];
    }
	*/
  }
}

// inserts question at end of array
MoodTest.prototype.add_question = function(question) {
  this.questions.splice(this.questions.length, 0, question);
}

var current_ans = 'START!';

MoodTest.prototype.display = function(container) {
  var self = this;
  var answered = 0;
  $('#end-page').hide();
  var question_container = $('<div>').attr('id', 'question').insertAfter('#moodtest-name');

  function change_question() {
    self.questions[current_index].display(question_container);
    if (current_index === self.questions.length - 1) {
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
  	document.getElementById("front-page").style.visibility = "hidden";
	document.getElementById("slider").style.visibility = "hidden";
	document.getElementById("value").style.visibility = "hidden";
  	$('#end-message').text('You successfully submitted all your answers!');
    $('#next-question').slideUp();
    $('#end-page').slideDown();
	navigator.serviceWorker.controller.postMessage(answerList);

    // Fabien will add function calls here
    predMoodOut = predictMood(answerList);
    generateCategoryLists(predMoodOut);
  }
  
  // display intro
  var current_index = 0;
  change_question();

  $('#next-question').click(function() {
	navigator.serviceWorker.controller.postMessage({id: current_index, ans: slider.value});
  if (current_index > 0) { 
		answerList.push(new questionResponse(slider.value, current_index)); 
	} 
	slider.value = 10;
	output.innerHTML = 10;
	if (current_index === self.questions.length - 1) {
      end_test();
    } else {
      current_index = self.questions[current_index].next_id[Math.floor(Math.random() * self.questions[current_index].next_id.length)];
      change_question();
    }
  });
}

var slider = document.getElementById("slider");
var output = document.getElementById("value");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

Question.prototype.display = function(container) {
  var self = this;
  var question_h2;
  if (container.children('h2').length === 0) {
    question_h2 = $('<h2>').appendTo(container);
  } else {
    question_h2 = container.children('h2').first();
  }
  question_h2.text(this.question);
  
  var question_h3;
  if (container.children('h3').length === 0) {
    question_h3 = $('<h3>').appendTo(container);
  } else {
    question_h3 = container.children('h3').first();
  }
  question_h3.text(this.description);
  
  /*
  // Clear any radio buttons and create new ones
  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function() {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    let choice = this.choices[i];
	// Create the radio button
    var choice_radio_button = $('<input>')
      .attr('id', 'choices-' + i)
      .attr('type', 'radio')
      .attr('name', 'choices')
      .attr('value', 'choices-' + i)
      .attr('checked', i === this.user_choice_index)
      .appendTo(container);

    // Create the label
    var choice_label = $('<label>')
      .text(choice)
      .attr('for', 'choices-' + i)
      .appendTo(container);
      
    choice_radio_button.click(function() {
    	document.getElementById("next-question").disabled = false;
		current_ans = choice;
    });
  }

  // Add a listener for the radio button to change which one the user has clicked on
  $('input[name=choices]').change(function(index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();

    // Change the user choice index
    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

    // Trigger a user-select-change
    container.trigger('user-select-change');
  });
  */
}

// main method to create questions and test and display everything
$(document).ready(function() {
  var moodtest = new MoodTest();
  for (var i = 0; i < questions.length; i++) {
    var question = new Question(questions[i].next_id, questions[i].question, questions[i].description);
    moodtest.add_question(question);
  }
  var test_container = $('#moodtest');
  moodtest.display(test_container);
});
