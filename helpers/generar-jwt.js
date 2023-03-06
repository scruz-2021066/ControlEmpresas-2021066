const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        //Se crea el token con la informacion
        jwt.sign(payload, process.env.SECRET_KEY_FOR_TOKEN, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo crear el token');
            } else {
                console.log('se obtuvo el token')
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}