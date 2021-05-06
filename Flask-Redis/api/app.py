from flask import Flask
import redis

app = Flask(__name__)

def connect_db():
    conexion = redis.StrictRedis(host='127.0.0.1', port=6379, db=0)
    if conexion.ping():
        print('Conectado al servidor de redis')
    else:
        print('Error')
    return conexion


@app.route('/')
def index():
    connect_db()
    return 'Hola Mundo'


@app.route('/about')
def about():
    return 'About Python Flask'

if __name__ == '__main__':
    app.run(host='localhost',port='5000', debug=False)
