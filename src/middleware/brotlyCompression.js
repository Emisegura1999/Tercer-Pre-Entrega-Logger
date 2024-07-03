const compression = require("express-compression");

 function brotliCompression(){
    compression({
        brotli: {
            enabled: true,
            zlib: {}
        }
    });
};

module.exports = brotliCompression;