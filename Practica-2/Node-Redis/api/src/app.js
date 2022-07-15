//CAMBIAR TODOS LOS BOTONES POR SOLO ETIQUETA A 

var redisClient = require('./bbdd');
var express = require('express');
var port = 3000;
var app = express();
var ejs = require('ejs');
const path = require('path');
app.set('port', port)


// Motor de plantilla
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body-parser de express
app.use(express.urlencoded({extended: false}));
app.use(express.json());


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


const nombresEpisodios = [
    "La amenaza fantasma",
    "El ataque de los clones",
    "La venganza de los Sith",
    "Una nueva esperanza",
    "El imperio contraataca",
    "El regreso de los Jedi",
    "El despertar de la fuerza",
    "Los ultimos Jedi",
    "El ascenso de Skywalker"
]

app.get('/', function(req, res){
    redisClient.keys('*', function(err, keys){
        res.render("index", {nombresEpisodios})
    })
});

//1- Genere un ruta agregar personajes, la cual reciba como parámetro el número episodio
//y el nombre del personaje.

app.get('/agregar', function(req, res){
    let listaEpisodios = []
    redisClient.keys('*', (error, reply) => {
        if (error) {
            res.render("agregar", {error})
        } else {
            listaEpisodios = reply.sort();
            res.render("agregar", {episodios: listaEpisodios, nombres: nombresEpisodios});
        }
    })
}); 

app.post('/agregar', function(req, res){
    const episodio = req.body.episodio || 0;
    const nombre = req.body.nombre.trim();
    redisClient.lpos(episodio, nombre, (err, pos) => {
        
        if ((nombre !== "") && (pos === null)){
            redisClient.lpush(episodio, nombre);
        }
    })
    res.redirect("/");
        
});

//2- Genere una ruta para quitar personajes, idem anterior

app.get('/eliminar', function(req, res){
    let listaEpisodios = []
    redisClient.keys('*', (error, reply) => {
        if (error) {
            console.log('Error al intentar obtener las claves');
        } else {
            listaEpisodios = reply.sort();
            res.render("eliminar", {episodios: listaEpisodios, nombres: nombresEpisodios});
        }
    })
});

app.post('/eliminar', function(req, res){
    const episodio = req.body.episodio || 0;
    const nombre = req.body.nombre.trim();
    redisClient.lrem(episodio, 0, nombre, (err, reply) => { 
        redisClient.exists(episodio, (err, reply) => {
            if (!reply){
                redisClient.lpush(episodio, "");
            }
        })
    });
    res.redirect("/");
});

//3- Genere una ruta para listar los personajes de un episodio, la cual reciba como
//parámetro el numero episodio

app.get('/listar/:id', function(req, res){
    const episodio = req.params.id;
    redisClient.lrange(episodio, 0, -1, function(err, values){
        if(!err){
            res.render("personajes", {personajes: values})
        }
    });
});

