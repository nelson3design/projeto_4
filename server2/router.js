const express = require('express')
require('dotenv').config()
const router = express.Router()
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
const User = require('./models/userModel')
const path = require('path')
const { checkUser } = require("./middlewares/authMiddleware");

const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }

})


const fileFilter = (req, file, cb) => {

    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('File must be of type JPG, JPEG,webp or PNG and nore more than 2MB in size'))
    }

    cb(undefined, true)
}



const upload = multer({
    storage: storage,

    fileFilter: fileFilter

})




router.get('/add', (req, res) => {
    res.render('add')
})

router.get('/edit', (req, res) => {
    res.render('edit')
})

router.get('/login', (req, res) => {
    const token = req.cookies.jwt;
    if (token){

        res.redirect('/user')
    }else{
       
        res.render('login')
    }
   
})

router.post('/add-action', upload.single('upload'), productController.createProduct)
router.get('/', productController.allProduct)
router.get('/product/:id', productController.oneProduct)
router.get('/edit/:id', productController.edit)
router.post('/edit-action', upload.single('upload'), productController.editAction)
router.get('/delete/:id', productController.deleteProduct)


router.get('/hamburguer', productController.hamburguer)
router.get('/pizza', productController.pizza)
router.get('/bebidas', productController.bebidas)
router.get('/destaque', productController.destaque)

// cadastrar usuário
router.post('/register', userController.userRegister)


router.post('/login', userController.userLogin)

router.get("/user", checkUser);


module.exports = router