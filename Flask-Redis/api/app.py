from flask import Flask
import redis
from flask import render_template, request


app = Flask(__name__)

def connect_db():
    conexion = redis.StrictRedis(host='127.0.0.1', port=6379, db=0)
    if conexion.ping():
        print('Conectado al servidor de redis')
    else:
        print('Error')
    return conexion


def get_lista(nombre):
    db = connect_db()
    db.lpush(nombre, '1: The Mandalorian, 2: The Child, 3: The Sin, 4: Sanctuary, 5: The Gunslinger, 6: The Prisoner, 7: The Reckoning, 8: Redemption')
    lista = db.lrange(nombre,0,-1)
    return lista


@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('/index.html', msj='Hola desde home')


@app.route('/about')
def about():
    return render_template('/about.html', msj='Hola desde about')



@app.route('/capitulos')
def capitulos():
    con = connect_db()
    lista = get_lista('capitulos')
    return render_template('/capitulos.html', datos=lista)




if __name__ == '__main__':
    app.run(host='web-app-flask', port='5000', debug=True)
