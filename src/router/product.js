const express = require('express');
const { createProduct, getProducts, getProduct } = require('../controller/product');
const router = express.Router();

router.get('/products', getProducts)
router.get('/products/create', createProduct)
router.get('/product/:id', getProduct)

module.exports = router