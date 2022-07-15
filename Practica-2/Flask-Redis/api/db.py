from cmath import log
import redis
from datos import seasons, episodes


def connect_db(database=0):
    conexion = redis.StrictRedis(host='localhost', port=6380, db=database, charset="utf-8", decode_responses=True)
    if(conexion.ping()):
        print("Conectado a servidor de redis")
    else:
        print("error")
    return conexion


conexion = connect_db()
conexionAlquiler = connect_db(1)


def init():
    conexion.flushall()

    for season in seasons:
        conexion.rpush("seasons", str(season))

    for i in range(1, 9):
        conexion.rpush("season1", str(i))

    for episode in episodes:
        conexion.hmset(episode['number'], episode)


def getTemporada():
    seasons = conexion.lrange("seasons", 0, -1)
    return seasons


def getEpisodios(season):
    lista_episodios = []
    num_episodios = conexion.lrange("season" + str(season), 0, -1)

    for number in num_episodios:
        lista_episodios.append(getDatosEp(number))
    

    return lista_episodios


def getDatosEp(number):
    data = conexion.hgetall(number)
    return data


def setEstadoEp(number, newStatus):
    data = getDatosEp(number)
    currentStatus = data["status"]
    if currentStatus != newStatus:
        conexion.hset(number, "status", newStatus)

def reservaEpisodios():
    conRes = connect_db(1)
    number_list = conRes.keys("*")
    episodes_list = []
    if number_list:
        for number in number_list:
            episode = getDatosEp(number)
            episodes_list.append(episode)
        episodes_list.sort(key=lambda e: int(e['number']))
    return episodes_list


def reservar(number):
    conexionAlquiler.setex(number, 10, "Reserved")


def eliminarReserva(number):
    conexionAlquiler.delete(number)
