const winston = require("winston");
const configObject = require("../config/env.config.js");

const niveles = {
    nivel: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
};

module.exports = loggerDev = winston.createLogger({
    levels: niveles.nivel,
    transports: [
        new winston.transports.Console({ 
            level: "debug",
        }),
    ]
});

module.exports = loggerProd = winston.createLogger({
    levels: niveles.nivel,
    transports: [
        new winston.transports.Console({ 
            level: "info",
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warning"
        })
    ]
});

module.exports = logger = configObject.winston.node_env === "production" ? loggerProd : loggerDev;