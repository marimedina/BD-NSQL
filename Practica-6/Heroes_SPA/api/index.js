const rutaHeroes = require('./routes/heroes')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



const app = express()
app.use(cors())

app.use(express.json())
app.use('/', rutaHeroes)

app.listen(5000, () => {
    console.log('Servidor corriendo en puerto 5000');
})