const app = require(`./app`)
const sequelize = require('./db.js')


sequelize.sync().then(()=>{
	console.log('db is ready')
})






app.listen(app.get('port'),()=>{
	console.log(`Server on the port ${app.get('port')}`)
})







