const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()
const authAPI =require('./rutas/auth.js')
const activitiesAPI =require('./rutas/activities.js')
const schoolsAPI =require('./rutas/schools.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

activitiesAPI(app);
schoolsAPI(app);
authAPI(app);
//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

// Redirige todas las solicitudes a 'index.html' para que Angular maneje el enrutamiento
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port= '8080'

var server = app.listen(port, () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})
