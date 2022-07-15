import redis

def connect_db(database=0):
    conexion = redis.StrictRedis(host='localhost', port=6380, db=database, charset="utf-8", decode_responses=True)
    if(conexion.ping()):
        print("Conectado a servidor de redis")
    else:
        print("error")
    return conexion
    