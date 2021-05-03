const Product = require('../models/products')
const products = require('../productsData')

module.exports.createProduct = async (req, res) => {
    const createdProducts = await Product.insertMany(products);
    res.status(201).json(createdProducts)
}

module.exports.getProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(201).json(products)
}

module.exports.getProduct = async (req, res) => {
    Product.findById(req.params.id)
    .then(product => res.status(201).json(product))
    .catch(err => res.status(404).json({ message: 'Product Not Found' }));
}
