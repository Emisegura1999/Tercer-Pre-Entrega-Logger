const socket = require("socket.io");

const ProductRepository = require("../repositories/product.repository.js");
const MessageModel = require("../models/messages.model.js");

const product = new ProductRepository(); 

class SocketManager {
    constructor(httpServer) {
        this.io = socket(httpServer);
        this.initSocketEvents();
    }
    async initSocketEvents() {
        this.io.on("connection", async (socket) => {
            console.log("Usuario conectado");       
            socket.emit("products", await product.getProducts() );
            socket.on("deleteProd", async (id) => {
                await product.deleteProduct(id);
                this.emitUpdatedProducts(socket);
            });
            socket.on("addProd", async (producto) => {
                await product.addProduct(producto);
                this.emitUpdatedProducts(socket);
            });
            socket.on("message", async (data) => {
                await MessageModel.create(data);
                const messages = await MessageModel.find();
                socket.emit("message", messages);
            });
        });
    }
    async emitUpdatedProducts(socket) {
        socket.emit("products", await product.getProducts());
    }
}

module.exports = SocketManager;
