import time
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/test', methods=['GET'])
def login():
    error = None
    if request.method == 'GET':
        return request.form['message']