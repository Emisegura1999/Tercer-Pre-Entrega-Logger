const moongose = require("mongoose");
const configObject = require("./src/config/env.config");

class DataBase {
  static #instance;
  constructor() {
    moongose.connect(configObject.server.mongo_url);
  }
  static getInstance() {
    try {
      if (this.#instance) return this.#instance;
      this.#instance = new DataBase();
      console.log("mongoDB connected succesfully");
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = DataBase.getInstance();
    