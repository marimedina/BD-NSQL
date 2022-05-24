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


@app.route('/', methods=['GET', 'POST'])
def index():
    """RETORNA LA PAGINA INICIO"""
    connect_db()
    return "hola desde index"


@app.route('/about')
def about():
    """RETORNA LA PAGINA ABOUT"""
    connect_db()
    return "Hola desde about"


if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=False)