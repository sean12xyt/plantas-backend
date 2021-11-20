let exp = require('express')
const cors = require(`cors`)
let app = exp()


app.set('port',process.env.PORT || 9000)

//middlewares

app.use(cors())
app.use(exp.json())

//routes

app.use('/api/products',require('./routes/products'))
app.use('/api/users',require('./routes/users'))
app.use('/api/pedidos',require('./routes/pedidos'))
app.use('/api/sendMail',require('./routes/mail'))


module.exports=app