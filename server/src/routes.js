const express = require("express");
const routes = express.Router();
const { findAllPagedSearch, findById, create, edit, remove } = require('./controllers/DesenvolvedorController')

routes.get('/developers', findAllPagedSearch)
routes.get('/developers/:id', findById)
routes.post('/developers', create)
routes.put('/developers/:id', edit)
routes.delete('/developers/:id', remove)

module.exports = routes;