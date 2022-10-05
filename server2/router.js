const express = require('express')

const router = express.Router()
const productController = require('./controllers/productController')

const path = require('path')

const multer = require('multer')

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

router.post('/add-action', upload.single('upload'), productController.createProduct)
router.get('/', productController.allProduct)
router.get('/edit/:id', productController.edit)
router.post('/edit-action', upload.single('upload'), productController.editAction)
router.get('/delete/:id', productController.deleteProduct)


router.get('/hamburguer', productController.hamburguer)
router.get('/pizza', productController.pizza)
router.get('/bebidas', productController.bebidas)


module.exports = router