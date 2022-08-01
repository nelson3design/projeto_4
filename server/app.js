const express = require('express');
const cors = require("cors");
const path = require('path')

const app = express();
app.use(cors({
    origin:"*"
}))


app.use('/',express.static(path.resolve(__dirname,"uplaod")))


var router = require('./router')


const port= process.env.PORT || 5000

app.set('view engine', 'ejs');


app.use(express.static('upload'))


app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.use('/', router);

app.listen(port,()=>{
    console.log('servidor rodando na porta de '+port)
})