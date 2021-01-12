const jwt = require('jsonwebtoken');


let verificar = (req, res, next) => {

    let token = req.get('token');

    // let token = req.headers.token;

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {

            return res.status(401).json({

                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;

        //console.log(req.usuario);
        next();

    });



};


let rol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.rol === 'ADMIN_ROLE') {

        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'no es el administrador'
            }
        });
    }


};


module.exports = {
    verificar,
    rol
};