const express = require('express');
const AuthService = require('../servicios/authService'); 

function usuariosAPI(app) {
    const router = express.Router();
    app.use('/api/usuarios', router);
    const authService = new AuthService();

    router.get('/:email', async function (req, res, next) {
        try {
          const email = req.params.email;
          const user = await authService.getUsuarioByEmail(email);
          if (user) {
            res.status(200).json({
              data: user,
              message: 'Dato recuperado con éxito'
            });
          } else {
            res.status(404).json({
              message: 'Usuario no encontrado'
            });
          }
        } catch (err) {
          console.log(`Se produjo un error ${err}`);
          res.status(500).json({
            message: 'Se produjo un error'
          });
        }
    });

    router.post('/', async function (req, res, next){
        try{
            const {body: user} = req; 

            const iduserAnadido = await authService.insertUsuario(user)
            res.status(201).json(
                {
                    data: iduserAnadido,
                    message: 'datos de usuario recuperados con éxito'
                }
            )
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })
}

module.exports = usuariosAPI;
