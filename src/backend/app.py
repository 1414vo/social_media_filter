import time
from urllib import response
from flask import Flask
from flask import request
from flask import Response
from process import Scorer

app = Flask(__name__)
scorer = Scorer()

@app.route('/time')
def get_current_time():
    #resp = flask.Response('{"time": {"Politics": 0.2525, "Art": 0.6246}}')
    resp = Response('{"time": {"Politics": 0.2525, "Art": 0.6246}}')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
    #return {'time': time.time()}

@app.route('/score', methods=['POST'])
def get_sentence_score():
    error = None
    if request.method == 'POST':
        resp_dict = {"category_scores": scorer.score(request.form['text'])}
        resp_text = str(resp_dict)
        resp_text = resp_text.replace("'", '"') # JSON doesn't seem to like single quotes.
        resp = Response(resp_text)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
