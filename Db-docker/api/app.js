

//Incluimos redis a nuestro script

var redis = require('redis');
var express = require('express');
var port = 3000;
var app = express();

var redisClient = redis.createClient(6379, 'db-redis')
app.set('port', port)


redisClient.on('connect', function(){
    console.log("conectado a redis")
})

/*
redisClient.set('key1', 'Hola1');
redisClient.set('key2', 'Hola2');
redisClient.set('key3', 'Hola3');


redisClient.get('key1', function(err, value){
    //retorna null si la key no existe
    console.log(value);
});*/


/*
redisClient.exists(key, function(err, reply){
    if(err != null){
        //error
    }
});
*/

/*
redisClient.lpush('key4', 'val1', 'val2', 'val3', 'val4');

redisClient.lrange('key4', 0, -1, function(err, values){
    console.log(values);
});
*/


//redisClient.lpush("personajes", "luke", "yoda", "han", "chewbacca", "leia", redis.print)
/*
redisClient.lrange("personajes", 0, -1, function(err, value){
    console.log(value);
    for (var i in value){
        console.log(value[i]);
    }
});
*/

//redisClient.flushdb();

redisClient.lpush('1','')
redisClient.lpush('2','')
redisClient.lpush('3','')
redisClient.lpush('4','')
redisClient.lpush('5','')
redisClient.lpush('6','')
redisClient.lpush('7','')
redisClient.lpush('8','')

//Home
app.get('/', function(req, res){
    redisClient.keys('*', function(err, keys){
        res.send('Lista de episodios: ' + JSON.stringify(keys))
    })
});

// Punto A - Cargar nuevo personaje a la lista
app.get('/cargar/:episodio/:nombre', function(req, res){
    redisClient.lpush(req.params.episodio, req.params.nombre)
    res.send('Carga lista')
});

// Punto C - Listar los personajes de un determinado episodio
app.get('/listar/:episodio', function(req, res){
    redisClient.lrange(req.params.episodio, 0, -1, function(err, values){
        res.send(JSON.stringify(values))
    });
});

// Punto B - Quitar los personajes de un episodio
app.get('/quitar/:episodio/:nombre', function(req, res){
    redisClient.lrem(req.params.episodio, 0, req.params.nombre)
    res.send('Personaje eliminado')
});


app.listen(app.get('port'), (err) => {
    console.log("Servidor corriendo en puerto 3000");
})

