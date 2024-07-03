const Ticket = require("../models/order.model.js");
const User = require("../models/user.model.js");

const CartRepository = require("../repositories/cart.repository.js");
const { ticketNumberRandom, totalPurchase } = require("../utils/cartutils.js");

const cartR = new CartRepository();

class CartController {
    async createCart(req, res) {
        try {
            const newCart = await cartR.createCart();
            res.json(newCart);
        } catch (error) {
            res.status(500).send("Error al crear carrito");
        }
    }

    async getProductsToCart(req, res) {
        const cartId = req.params.cid;
        try {
            const products = await cartR.obtenerProductosDeCarrito(cartId);
            if (!products) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            res.json(products);
        } catch (error) {
            res.status(500).send("Error al obtener productos del carrito");
        }
    }

    async addProductsToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1;
        try {
            await cartR.addProductInCart(cartId, productId, quantity);
            const ID = (req.user.cart).toString();

            res.redirect(`/carts/${ID}`)
        } catch (error) {
            res.status(500).send("Error al agregar productos al carrito");
        }
    }

    async deleteProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            const updatedCart = await cartR.deleteProductInCart(cartId, productId);
            res.json({
                status: 'success',
                message: 'Producto eliminado del carrito',
                updatedCart,
            });
        } catch (error) {
            res.status(500).send("Error al eliminar producto del carrito");
        }
    }

    async updateProductsToCart(req, res) {
        const cartId = req.params.cid;
        const updatedProducts = req.body;
        try {
            const updatedCart = await cartR.UpdateQuantity(cartId, updatedProducts);
            res.json(updatedCart);
        } catch (error) {
            res.status(500).send("Error al actualizar productos en el carrito");
        }
    }

    async updateQuantity(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = req.body.quantity;
        try {
            const updatedCart = await cartR.UpdateQuantity(cartId, productId, newQuantity);
            res.json({
                status: 'success',
                message: 'Stock del producto actualizado en el carrito',
                updatedCart,
            });
        } catch (error) {
            res.status(500).send("Error al actualizar el stock del carrito");
        }
    }

    async emptyCart(req, res) {
        const cartId = req.params.cid;
        try {
            const updatedCart = await cartR.emptyCart(cartId);
            res.json({
                status: 'success',
                message: 'Carrito vacio',
                updatedCart,
            });
        } catch (error) {
            res.status(500).send("Error al vaciar carrito");
        }
    }

    async finishPurchase(req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await cartR.obtenerProductosDeCarrito(cartId);
            const userWithCart = await User.findOne({ cart: cartId });
            const ticket = new Ticket({
                code: ticketNumberRandom(),
                amount: totalPurchase(cart.products),
                purchaser: userWithCart._id
            });
            await ticket.save();
            await cart.save();
            res.redirect(`/${cartId}/purchase`)
        } catch (error) {
            console.error('Error al realizar compra, intenta nuevamente');
            res.status(500).json({ error: 'Error al comprar productos' });
        }
    }
}

module.exports = CartController;

