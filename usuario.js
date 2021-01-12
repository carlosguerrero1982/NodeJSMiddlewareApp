const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificar, rol } = require('../middlewares/autenticacion');

app.get('/usuario', verificar, (req, res) => {


    let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;

    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email rol estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios: usuarios,
                    conteo: conteo
                });

            });


        });

});

app.post('/usuario', [verificar, rol], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        //  usuarioDB.password = null;

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

app.put('/usuario/:id', [verificar, rol], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'rol', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (error, usuarioDB) => {


        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB

        });

    });




});

app.delete('/usuario/:id', [verificar, rol], function(req, res) {

    let id = req.params.id;

    let cambioEstado = {
        estado: false
    };

    // Usuario.findOneAndUpdate(id, cambioEstado, { new: true }, (error, usuarioBorrado) => {
    Usuario.findByIdAndRemove(id, cambioEstado, (error, usuarioBorrado) => {

        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }

        if (usuarioBorrado === null) {

            return res.status(400).json({
                ok: false,
                error: {
                    message: "usuario no encontrado"
                }
            });

        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });


});


module.exports = app;