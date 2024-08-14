const { where } = require('sequelize');
const restaurant = require ('../db/restaurante.db')

const findAll = async (req, res) => {
    const restaurants = await restaurant.findAll();
    res.json(restaurants);
}

const addRestaurant = async (req, res) => {
    const result = await restaurant.create(req.body)
    res.json(req.body);
} 

const removeRestaurantByName = async (req, res) => {
    const name = req.params.name;
    let result;
    if(result = await restaurant.findOne({where:{name: name}})){
        result.destroy();
        res.json(result);
    }
    else{
        res.json("Restaurante não encontrado!")
    }
}

const findByName = async (req, res) => {
    const name = req.params.name;
    let result;
    if(result = await restaurant.findOne({where:{name: name}})){
        res.json(result)
    }
    else{
        res.json("Restaurante não encontrado");
    }
}

const updateLocalization = async (req, res) => {
    const newLoc = req.body;
    console.log(newLoc)
    let result;
    const restaurantName = req.params.name;
    if(result = await restaurant.findOne({where:{name: restaurantName}})){
        result.localization = newLoc;
        await result.save();
        res.json(result)
    }
    else{
        res.json("Restaurante não encontrado");
    }
}

module.exports = {findAll, addRestaurant, removeRestaurantByName, findByName, updateLocalization}
