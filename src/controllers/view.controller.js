const Product = require("../models/products.model.js");
const CartRepository = require("../repositories/cart.repository.js");
const ProductRepository = require("../repositories/product.repository.js")

const prodR = new ProductRepository();
const cartR = new CartRepository();

class ViewsController {
    async products(req, res) {
        try {
            const { page = 1, limit = 6 } = req.query;
            const skip = (page - 1) * limit;
            const products = await Product.find().skip(skip).limit(limit);
            const totalProducts = await Product.countDocuments();
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
            const newArray = products.map(producto => {
                const { _id, ...rest } = producto.toObject();
                return { id: _id, ...rest };
            });
            const cartId = req.user.cart.toString();
            res.render("products", {
                productos: newArray,
                hasPrevPage,
                hasNextPage,
                prevPage: page > 1 ? parseInt(page) - 1 : null,
                nextPage: page < totalPages ? parseInt(page) + 1 : null,
                currentPage: parseInt(page),
                totalPages,
                cartId
            });
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

    async cart(req, res) {
        const cartId = req.params.cid;
        try {
            const cart = await cartR.obtenerProductosDeCarrito(cartId);

            if (!cart) {
                console.log("El carrito no existe");
                return res.status(404).json({ error: "Carrito no encontrado" });
            }
            let totalPurchase = 0;
            const productInCart = cart.products.map(item => {
                const product = item.product.toObject();
                const quantity = item.quantity;
                const totalPrice = product.price * quantity;
                totalPurchase += totalPrice;
                return {
                    product: { ...product, totalPrice },
                    quantity,
                    cartId
                };
            });
            res.render("carts", { productos: productInCart, totalPurchase, cartId });
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

    async login(req, res) {
        try {
            res.render("login");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

    async register(req, res) {
        try {
            res.render("register");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

   

    async realTimeProducts(req, res) {
        try {
            res.render("realtimeproducts");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

    async chat(req, res) {
        try {
            res.render("chat");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

    async home(req, res) {
        try {
            res.render("home");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }

    async notFound(req, res) {
        try {
            res.render("404");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }
   
    async denied(req, res) {
        try {
            res.render("accessDenied");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }
    
    async ticket(req, res) {
        try {
            res.render("Ticket");
        } catch (error) {
            res.redirect("/404-not-found");
        }
    }
}

module.exports = ViewsController;
