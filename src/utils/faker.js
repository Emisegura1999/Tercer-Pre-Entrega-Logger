const { faker } = require("@faker-js/faker");

productsGenerator = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()),
        description: faker.commerce.productDescription(),
    };
};

module.exports = UserGenerator = () => {
    const productos = parseInt(faker.string.numeric());
    let productsCart = [];
    for (let i = 0; i < productos; i++) {
        productsCart.push(productsGenerator())
    };
    return {
        id: faker.database.mongodbObjectId(),
        firts_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles: faker.person.jobArea(),
        productsCart
    };
};