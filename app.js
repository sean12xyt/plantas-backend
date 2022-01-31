let exp = require('express')
const cors = require(`cors`)
let app = exp()
// const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')

app.use(morgan('tiny'))

app.set('port',process.env.PORT || 4000)

//middlewares

// LLQ5YNE4sW4CTnw.,^%65$#{}/

app.use(cors())
app.use(helmet.hidePoweredBy())
app.use(helmet.xssFilter())
app.use(exp.json())

//routes
app.get('/',(req,res)=>{
    
    res.json({
        "message":"Hello from now on you can use my api or not xd xd ☺. I will pay you if you hack me",
        "querys":req.query,
        "req":req.ip
        
    })
})


app.use('/api/products',require('./routes/products'))
app.use('/api/users',require('./routes/users'))
app.use('/api/pedidos',require('./routes/pedidos'))
app.use('/api/sendMail',require('./routes/mail'))
app.use('/api/posts',require('./routes/post'))
app.use('/api/comments',require('./routes/comments'))


app.get('*',(req,res)=>{
    res.status(404).json({
        "m":"What did you put"
    })
})


module.exports=app

