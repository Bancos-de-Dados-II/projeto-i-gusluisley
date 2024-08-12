const express = require('express')
require ('dotenv').config()
const sequelize = require('./db/sequelize')
const restaurant = require('./db/restaurante.db');
const { findAll, addRestaurant } = require('./controller/controller');
const port = process.env.API_PORT;
const app = express();
app.use(express.json());
app.get('/', findAll)

app.post('/', addRestaurant)


app.delete('/', (req, res) => {
    res.json('Apaga')
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})