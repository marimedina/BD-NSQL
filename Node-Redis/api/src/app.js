// -------------------------------------------
//REVISAR PORQUE EN DOCKER COMPOSE QUEDÓ MAL LA URL EN "VOLUMES" y probablemente no ande
// -------------------------------------------

var redisClient = require('./bbdd')
var express = require('express');
var port = 3000;
var app = express();
app.set('port', port)


app.listen(app.get('port'), (err) => {
    console.log("Servidor corriendo en puerto " + app.get('port'));
})

//Para setear la base de datos
redisClient.flushdb();

//Carga de episodios

redisClient.lpush('1', 'P1E1', 'P2E1')
redisClient.lpush('2','P1E2', 'P2E2')
redisClient.lpush('3','P1E3', 'P2E3')
redisClient.lpush('4','P1E4', 'P2E4')
redisClient.lpush('5','P1E5', 'P2E5')
redisClient.lpush('6','P1E6', 'P2E6')
redisClient.lpush('7','P1E7', 'P2E7')
redisClient.lpush('8','P1E8', 'P2E8')

//Home
const episodios = [
    '1-La amenaza fantasma',
    '2-El ataque de los clones',
    '3-La venganza de los Sith',
    '4-Una nueva esperanza',
    '5-El imperio contraataca',
    '6-El regreso de los Jedi',
    '7-El despertar de la fuerza',
    '8-Los ultimos Jedi',
    '9-El ascenso de Skywalker'
]
/*
app.get('/', function(req, res){
    redisClient.keys('*', function(err, keys){
        res.send('index',{episodios})
    })
});*/

//1- Genere un ruta agregar personajes, la cual reciba como parámetro el número episodio
//y el nombre del personaje.

app.get('/cargar/:episodio/:nombre', function(req, res){
    redisClient.lpush(req.params.episodio, req.params.nombre)
    res.send('Personaje cargado')
}); 

//2- Genere una ruta para quitar personajes, idem anterior

app.get('/eliminar/:episodio/:nombre', function(req, res){
    redisClient.lrem(req.params.episodio,0, req.params.nombre)
    res.send('Personaje eliminado')
});

//3- Genere una ruta para listar los personajes de un episodio, la cual reciba como
//parámetro el numero episodio

app.get('/listar/:episodio', function(req, res){
    redisClient.lrange(req.params.episodio, 0, -1, function(err, values){
        res.send(JSON.stringify(values))
    });
});

