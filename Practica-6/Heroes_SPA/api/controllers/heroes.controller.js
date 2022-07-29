const data = require('../../db/heroes.json')

const getHeroes = (req, res) => {
    res.send(data)
}

/*
createHeroe
getHeroesMarvel
getHeroesDc
getHeroeById
updateHeroeById
deleteHeroeById*/


module.exports = {
    getHeroes
}