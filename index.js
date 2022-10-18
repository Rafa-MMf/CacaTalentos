const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes/routes')

const bodyParser = require('body-parser')
//const multer = require('multer')
//const upload = multer()

const path = require('path')
const flash = require('connect-flash')

//const fs = require("fs");
const session = require('express-session')
//const http = require('http')

const mongoose = require('mongoose')

const handlebars = require('express-handlebars')
const { engine } = require('express-handlebars')

//sessão
app.use(session({ secret: "abc", resave: true, saveUninitialized: true }));
app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

//config handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

//app.use(express.json())
//app.use(express.urlencoded());


// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//arquivo estatico ex: css e javascript
app.use(express.static(path.join(__dirname, 'public')))

//rotas
app.use("/", routes)


//conexão com mongodb
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/CTalentos").then().catch().then(() => {
    console.log('Mongodb conectado!')
}).catch((err) => {
    console.log(`erro ao se conectar ao mongodb || ${err}`)
})


//iniciar servidor
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`)
})