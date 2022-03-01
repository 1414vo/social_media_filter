import time
from flask import Flask
from flask import request
from process import Scorer

app = Flask(__name__)
scorer = Scorer()

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/score', methods=['GET'])
def get_sentence_score():
    error = None
    if request.method == 'GET':
        print(request.form['text'])
        return scorer.score(request.form['text'])
