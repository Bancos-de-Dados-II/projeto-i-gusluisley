const Sequelize = require('sequelize')
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE,
                                process.env.POSTGRES_USER,
                                process.env.POSTGRES_PASSWORD,
                                {
                                    host: process.env.POSTGRES_HOST,
                                    dialect:'postgres'
                                }) 

const connect = async () => {
    try{
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!!!')
    }   catch (error){
        console.error("Impossível conectar com o banco de dados. :/", error)
    }
}

connect();

module.exports = sequelize