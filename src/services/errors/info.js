module.exports = GenerateInfoError = (user) => {
    return `El sistema necesita recibir los siguientes datos:
    - Nombre: debe ser de tipo texto y se recibio ${user.first_name}
    - Apellido:  debe ser de tipo texto y se recibio ${user.last_name}
    - Email: debe ser de tipo email y se recibio ${user.email}
    - Password: debe ser de tipo password y se recibio ${user.password}
    - Rol: debe ser de tipo texto y se recibio ${user.roles}`
}
