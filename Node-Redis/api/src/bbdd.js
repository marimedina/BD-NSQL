
var redis = require('redis');
//const redisClient = redis.createClient("redis://db-redis:6379");
const redisClient = redis.createClient("redis://localhost:6380");

redisClient.on('connect', function(){
    console.log("Conectado a redis")
})

module.exports = redisClient