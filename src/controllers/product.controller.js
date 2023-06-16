const Product = require('../models/products.model')

const addProduct = async(req,res) => {
    try {
        const {name,type,quantity} = req.body
        const createdBy = req.user.userId

        const product = await Product.create({name,type,quantity,createdBy})

        if(product) {
            return res.status(201).json({product})
        }
        return res.status(400).json({error: "Failed to create product"})
    }
    catch(err) {
        return res.status(500).json({err: "Internal Server Error"})
    }
}

module.exports = {addProduct}
