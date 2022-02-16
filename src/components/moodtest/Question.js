import $ from 'jquery';
export default class Question {
    constructor(next_id, question, description) {
       this.next_id = next_id;
      this.question = question;
      this.description = description;
    }
  }
  
  Question.prototype.display = function(container) {
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
  }