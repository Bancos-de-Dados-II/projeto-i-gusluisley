const express = require('express')
require ('dotenv').config()
const sequelize = require('./db/sequelize')
const restaurant = require('./db/restaurante.db');
const { findAll, addRestaurant, removeRestaurantByName, findByName } = require('./controller/controller');
const port = process.env.API_PORT;
const app = express();
app.use(express.json());
app.get('/', findAll)
app.get('/:name', findByName)
app.post('/', addRestaurant)
app.delete('/:name', removeRestaurantByName)

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})