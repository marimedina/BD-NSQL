
from crypt import methods
import redis
from flask import Flask, render_template, request, redirect, url_for
from database import connect_db

app = Flask(__name__, template_folder='template')

conexion = connect_db()

@app.route('/')
def index():
    return render_template('/index.html')

@app.route('/cargar', methods = ['GET', 'POST'])
def cargar():
    if (request.method == "GET"):
        grupo = request.args.get('select')
        nombre = request.args.get('nombre')
        long = request.args.get('longuitud')
        lat = request.args.get('latitud')
        if ((grupo != None) and (long != None) and (lat != None) and (nombre != None)):
            conexion.geoadd(grupo, long, lat, nombre)
    return render_template('/cargar.html')

if __name__ == "__main__":
    app.run(host="localhost", port="5000", debug=True)

