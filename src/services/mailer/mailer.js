const nodemailer = require("nodemailer");
const configObject = require("../config/env.config");

class EmailManager {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: configObject.mailer.mailer_user,
                pass: configObject.mailer.mailer_pass,
            },
        });
    }

    async enviarCorreoCompra(email, first_name, ticket) {
        try {
            const Opt = {
                from: "Tecnocommerce<ejemploaleatorio123@gmail.com>",
                to: email,
                subject: "compra exitosa",
                html: `
                    <p>Gracias por tu compra!</p>
                    <p>orden de compra #:${ticket}</p>
                `,
            };
            await this.transporter.sendMail(Opt);
        } catch (error) {
            console.error("Error al enviar Email:");
        }
    }
}

module.exports = EmailManager;
