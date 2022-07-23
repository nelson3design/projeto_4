const express = require('express');
const { json } = require('express/lib/response');
const cors = require("cors");
const path = require('path')

const app = express();
app.use(cors({
    origin:"*"
}))


app.use('/',express.static(path.resolve(__dirname,"uplaod")))


var router = require('./router')


app.set('view engine', 'ejs');


app.use(express.static('upload'))


app.use(express.urlencoded({extended: false}))
app.use(express(json))



app.use('/', router);

app.listen(5000,()=>{
    console.log('servidor rodando na porta de 5000')
})