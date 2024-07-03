const UserGenerator = require("../utils/faker.js")
const CustomError = require("../services/errors/custom-error.js");
const GenerateInfoError = require("../services/errors/info.js");
const dictionaryErrors = require("../services/errors/enum.js");

const userArray = [];
class TestManager {
   async getTest(req, res) {
      const userFaker = [];
      for (let i = 0; i < 100; i++) {
         userFaker.push(UserGenerator());
      }
      res.send(userFaker)
   };

   async createError(req, res, next) {
      const { firts_name, last_name, email, password, roles } = req.body;
      try {
         if (!firts_name || !last_name || !email || !password || !roles) {
            throw CustomError.createError({
               name: "Nuevo usuario",
               fact: GenerateInfoError({
                  firts_name,
                  last_name,
                  email,
                  password,
                  roles
               }),
               message: "Error al intentar crear un usuario",
               code: dictionaryErrors.INVALID_TYPE
            });
         }
         const user = {
            firts_name,
            last_name,
            email,
            password,
            roles
         };
         userArray.push(user);
         res.send({
            status: "success",
            user: user
         });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = TestManager;

