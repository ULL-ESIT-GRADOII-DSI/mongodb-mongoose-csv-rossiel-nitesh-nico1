"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const calculate = require('./models/calculate.js');
const basedatos = require('./models/schema.js');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {     

 response.render ('index', {title: 'Ajax' })
});

app.get('/csv', (request, response) => {
 response.send({"rows": calculate(request.query.input)}) 
  
});

//Cuando se guarda el nombre

app.get('/mongo/:nombre', function(req, res) {
  /* ... Consultar la base de datos y retornar contenidos de input1 ... */
  basedatos.find({}, function(err, docs) {
        if (err)
            return err;
        if (docs.length >= 4) {
            basedatos.remove({ id: docs[3].id }).exec();
        }
  });
        let c4 = new basedatos({
        "id": req.params.nombre,
        "data": req.query.dataString
        });
        
        c4.save(function(err) {
        if (err) {
            return err;
        }
        console.log(`Guardado: ${c4}`);
    });
});


app.get('/encuentra', function(req, res) {
    basedatos.find({}, function(err, docs) {
        if (err)
            return err;
        res.send(docs);
    });
});

/*Se devuelve como respuesta la entrada correspondiente al nombre
  especificado en la request*/
app.get('/imput', function(req, res) {
    basedatos.find({
        id: req.query.id
    }, function(err, docs) {
        res.send(docs);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost:${app.get('port')}` );
});
