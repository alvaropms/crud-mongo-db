const express = require('express');
const personController = require('./controllers/personController')

const routes = express.Router()

routes.post('/person', personController.create)
routes.get('/person', personController.list)
routes.delete('/person/:id', personController.delete)
routes.put('/person/:id', personController.update)

module.exports = routes;