const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");
const Cart = require("../models/cart.model.js");

const configObject = require("../config/env.config.js");
const { createHash, isValidPassword } = require("../utils/hashbcryp.js");
const DTO = require("../Dto/UserDto.js");

class UserController {
    async register(req, res) {
        const { first_name, last_name, email, password, age } = req.body;
        try {
            const userExist = await User.findOne({ email });
            if (userExist) {
                return res.status(400).send("El usuario ya esta registrado");
            }
            const newCart = new Cart();
            await newCart.save();
            const newUser = new User({
                first_name,
                last_name,
                email,
                cart: newCart._id, 
                password: createHash(password),
                age,
                role
            });
            await newUser.save();
            const token = jwt.sign({ user: newUser }, configObject.auth.jwt_secret, {
                expiresIn: "1h"
            });
            res.cookie(configObject.auth.cookie_token, token, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.redirect("/api/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al registrar usuario");
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const userFound = await User.findOne({ email });

            if (!userFound) {
                return res.status(401).send("Credenciales incorrectas");
            }
            const isValid = isValidPassword(password, userFound);
            if (!isValid) {
                return res.status(401).send("Contraseña incorrecta");
            }
            const token = jwt.sign({ user: userFound }, configObject.auth.jwt_secret, {
                expiresIn: "1h"
            });
            res.cookie(configObject.auth.cookie_token, token, {
                maxAge: 3600000,
                httpOnly: true
            });
            res.redirect("/api/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al iniciar sesion");
        }
    }

    async profile(req, res) {
        const dto = new DTO(req.user.first_name, req.user.last_name, req.user.role);
        const isAdmin = req.user.role === 'admin';
        res.render("profile", { user: dto, isAdmin });
    }

    async logout(req, res) {
        res.clearCookie(configObject.auth.cookie_token);
        res.redirect("/");
    }

    async admin(req, res) {
        if (req.user.user.role !== "admin") {
            return res.redirect("/access-denied")
        }
        res.render("admin");
    }
}

module.exports = UserController;
