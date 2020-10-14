require('dotenv').config();

const PORT = process.env.PORT
const DB = process.env.DB

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

let file;

const loadFile = () => file = JSON.parse(fs.readFileSync(process.env.DB, 'utf-8'));


const app = express();

app.use(bodyParser.json({ limit: '20MB' }));
app.use(bodyParser.urlencoded({}))

app.get('/', (req, res, next) => {
    /*
    req
        -Params parametros de url ej: localhost:2000/api/usuarios/:id, req.params.id
        -Query parametros de la url pero en query params ej: localhost:2000/api/usuarios?id:nuestra-id, req.query.id
        -body caso de que sea post y put, req.body
    
    res
        res.sendStatus(200,204,403);
        res.send(); solo una vez
    
    next
        continuar con la ejecucion
    
    app.get('/sincronizar', preSalvadoDatos, trabadeDatos)

    preSalvadoDatos(req,res,next) => {...... se trabajan datos de pre guardado ...... next();}
    trabadeDatos(req,res,next) => {..... trabajar datos ..... res.send()}
    */

    res.send('hola mundo');
});

app.get('/query', (req, res, next) => { res.send(req.query.id) });

app.get('/:id', (req, res, next) => {
    loadFile();
    const result = file.find(obj => parseInt(obj._id) === parseInt(req.params.id));
    console.log(result)
    res.send(result)
})

app.listen(PORT, () => console.log(`running on port ${PORT}`));