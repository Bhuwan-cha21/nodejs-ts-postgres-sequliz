let express = require('express')
const app = express()
let {Client} = require('pg')
let bodyparser = require('body-parser')
let cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyparser.json());
let dotenv = require('dotenv')
dotenv.config()
var studentRoute = require('./routes/studentRoute')
var subjectRoute = require('./routes/subjectRoute');
app.use('/studentapi', studentRoute)
app.use('/subjectapi', subjectRoute);

app.listen(3000,() =>{
    console.log('server is running')
})

