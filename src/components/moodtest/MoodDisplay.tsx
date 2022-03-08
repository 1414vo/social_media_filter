import React from "react";
import './MoodTest.css';
import $, { param } from 'jquery';
import MoodTest from "./MoodTest";
import Question from "./Question";

interface IMoodDisplayProps {
  callback: Function;
}
class MoodDisplay extends React.Component<IMoodDisplayProps>{
    constructor(props: IMoodDisplayProps){
      super(props);
    }

    displayComponent() {
      var component = this;
      // List of all questions
      const questions = [{
        next_id: [1, 2],
        question: "Answer 4 questions for a better Twitter experience! :)", // Intro
        description: "Click the Start button to begin.",
      },
      {
        next_id: [3, 4, 11],
        question: "Did you sleep well last night?", // Q1 
        description: "1: can't fall asleep, 10: slept very well"
      },
      {
        next_id: [3, 4, 11], 
        question: "How is your appetite today?", // Q2
        description: "1: extremely poor, 10: extremely good",
      },
      {
        next_id: [5, 6, 7],
        question: "Have you felt energised when trying to work?", // Q3 
        // Alternative: little energy
        description: "1: very tired, 10: extremely energised", 
      },
      {
        next_id: [5, 6, 7],
        question: "How much is going through your head?", // Q4 
        description: "1: not much at all, 10: loads of thoughts" 
      },
      {
        next_id: [8, 9, 10],
        question: "How easy did you find it to relax today?", // Q5 
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
        next_id: [], // Can be the last question
        question: "Do you feel hot in the upper part of your body?", // Q8
        description: "1: not hot at all, 10: extremely hot" 
      },
      {
        next_id: [], // Can be the last question
        question: "Are your muscles stiff and tight?", // Q9
        description: "1: not stiff and tight at all, 10: extremely stiff and tight", 
      },
      {
        next_id: [], // Can be the last question
        question: "Are you experiencing a headache or any other kind of pain?", // Q10
        description: "1: no headache or pain at all, 10: very severe headache or pain" 
      },
      {
        next_id: [5, 6, 7],
      question: "How high is your self-esteem now?", // Q11
      description: "1: very low, 10: very high"
      },
      {
        // This question is not included in the mood test but may be useful in the future
        next_id: [], 
      question: "Now measure your heartbeat for 15 seconds. How many heartbeats did you count?", 
      description: "1: between 1 and 5, 10: between 46 and 50"
      },
    ];

      // Main method to create questions and test and display everything
      $(document).ready(function() {
        var moodtest = new MoodTest();
        for (var i = 0; i < questions.length; i++) {
          var question = new Question(questions[i].next_id, questions[i].question, questions[i].description);
          moodtest.add_question(question);
        }
        var test_container = $('#moodtest');
        moodtest.display(test_container);
        // Send message to update the category lists on quiz completion.
        $("#moodtest").on('end', function(event, param1) {
          component.props.callback(param1.primaryList, param1.secondaryList, param1.avoidList);
          console.log("here!");
        });
      });

      
    }

    componentDidMount() {
      this.displayComponent();
    }
    /**
     * Renders the questionnaire.
     * @returns The rendered component.
     */
    render(){
        return (<div id="moodtest">
        <div>
		      <p id="predicted-mood">Predicted Mood</p>
	      </div>
        <div id="front-page">
          <h1 id="moodtest-name"></h1>
          <input type="range" min="1" max="10" className="slider" id="slider"/>
          <h1 id="value"></h1>
          <button id="next-question">Next Question</button>
        </div>
       
        <div id="end-page">
          <p id="end-message"></p>
          <button id="restart">Try Again</button>
        </div>
      </div>);
    }
}

export default MoodDisplay;