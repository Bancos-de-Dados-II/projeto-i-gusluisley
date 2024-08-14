const sequelize = require('./sequelize') 

const {DataTypes} = require('sequelize')


const Restaurant = sequelize.define('Restaurant',  {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    localization: {
        type:DataTypes.GEOMETRY,
        allowNull: false
    }
})

async function sync(){
    await Restaurant.sync();
    console.log('Sincronizado com sucesso')
}
sync();

module.exports = Restaurant;