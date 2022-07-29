const { Router } = require('express')
const router = Router()

const { getHeroes } = require('../controllers/heroes.controller')

//todos
router.route('/heroes')
    .get(getHeroes)


module.exports = router
    /*
    .post(createHeroe)

app.route('/marvel').get(getHeroesMarvel)
app.route('/dc').get(getHeroesDc)

//uno en especifico
app.route('/heroes/:id')
    .get(getHeroeById)
    .put(updateHeroeById)
    .delete(deleteHeroeById)*/

