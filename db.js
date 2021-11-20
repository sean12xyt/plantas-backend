const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('Store-db','user','pass',{
	dialect:'sqlite',
	host:'./store.sqlite',

})

module.exports=sequelize

