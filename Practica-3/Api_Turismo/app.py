
from crypt import methods

import redis
from flask import Flask, render_template, request, redirect, url_for
from database import connect_db

app = Flask(__name__, template_folder='template')

conexion = connect_db()

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/cargar', methods = ['GET', 'POST'])
def cargar():
    if (request.method == "POST"):
        grupo = request.form['grupo']
        lon = float(request.form['long'])
        lat = float(request.form['lat'])
        nombre = request.form['nombre']
        print(grupo, lon, lat, nombre)
        if ((grupo != None) and (lon != None) and (lat != None) and (nombre != None)):
            try: 
                conexion.geoadd(name=grupo, values=(lon, lat, nombre))
            except Exception as e:
                print(e)
    return render_template('./cargar.html')

'''cargar por consola ejemplos y probar, ver fotos'''
@app.route('/listar', methods = ['GET', 'POST'])
def listar():
    if (request.method == "GET"):
        cervecerias = []
        universidades = []
        farmacias = []
        emergencias = [] 
        supermercados = []
        long = request.args.get('long')
        lat = request.args.get('lat')
        if (long != None) and (lat != None):
            cervecerias = conexion.georadius('Cervecerias', long, lat, 5, 'km')
            universidades = conexion.georadius('Universidades ', long, lat, 5, 'km')
            farmacias = conexion.georadius('Farmacias ', long, lat, 5, 'km')
            emergencias = conexion.georadius('Emergencias ', long, lat, 5, 'km')
            supermercados = conexion.georadius('Supermercados ', long, lat, 5, 'km')
    return render_template('./listar.html', cervecerias = cervecerias, universidades = universidades, farmacias = farmacias, emergencias = emergencias, supermercados = supermercados)

if __name__ == "__main__":
    app.run(host="localhost", port="5000", debug=True)

