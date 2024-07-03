const ProductRepository = require("../repositories/product.repository.js");
const Product = require("../models/products.model.js");
const productR = new ProductRepository();

class ProductController {
    async addProduct(req, res) {
        const newProd = req.body;
        try {
            const prod = await productR.addProduct(newProd);
            res.json(prod);
        } catch (error) {
            res.status(500).send("Error al crear producto");
        }
    };

    async getProducts(req, res) {
        try {
            let { limit = 10, page = 1, sort, query } = req.query;
            const prods = await productR.getProducts(limit, page, sort, query);
            res.json(prods);
        } catch (error) { 
            res.status(500).send("Error al obtener productos");
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.pid;
            const productUpdate = req.body;
            const prod = await productR.updateProduct(id, productUpdate);
            res.json(prod);
        } catch (error) {
            res.status(500).send("Error al actualizar el producto");
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.pid;
        try {
            let prod = await productR.deleteProduct(id);

            res.json(prod);
        } catch (error) {
            res.status(500).send("Error al eliminar el producto");
        }
    }
}

module.exports = ProductController; 