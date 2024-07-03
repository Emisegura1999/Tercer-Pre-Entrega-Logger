class LoggerManager {
    async getLogs (req, res){
        req.logger.http("Mensaje http");
        req.logger.info("Mensaje Info");
        req.logger.warning("Mensaje warning");
        req.logger.error("Mensaje error");
        req.logger.debug("Mensaje debug");
        res.send("logs generados");
    };
};

module.exports = LoggerManager;