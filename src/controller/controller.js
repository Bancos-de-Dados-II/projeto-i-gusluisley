const restaurant = require ('../db/restaurante.db')

const findAll = async (req, res) => {
    const restaurants = await restaurant.findAll();
    res.json(restaurants);
}

const addRestaurant = async (req, res) => {
    console.log(req.body)
    const result = await restaurant.create(req.body)
    res.json(req.body);
} 

module.exports = {findAll, addRestaurant}
