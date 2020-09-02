const express = require('express');
const morgan = require('morgan');
const app = express();

//midleware, se llama antes de llamar las rutas
function logger(req, res, next){
    console.log('Respuesta recobida')
    next()
}

//Settings
app.set('appName', 'Tutorial node js')
app.set('port', 3000)
app.set('view engine', 'ejs');


//Midlewares
app.use(express.json());
app.use(morgan('dev'));

//app.use(logger);

//rutas

//se llama antes de todas las rutas /user
app.all('/user', (req, res, next)=>{
    console.log(`Ruta recibida: ${req.protocol}://${req.get('host')}${req.originalUrl}`);

    next()//para continuar con la ruta original
    //res.send('finish') //para detener la ruta
})

app.get('/', (req, res)=>{
    const data = [{nombre:'Ervin'}, {nombre:'Mario'}]
    res.render('index.ejs', {personas: data});
})

app.get('/ini', (req, res)=>{
    res.send('peticion get recibida');
});

app.get('/user', (req, res)=>{
    res.json(
        {
            username:'Cameron',
            lastname: 'howe'
        }
    );
});

app.post('/about', (req, res)=>{
    res.send('peticion post recibida');
});

app.post('/user/:id', (req, res)=>{
    console.log(req.body)
    console.log(req.params)
    res.send('peticion post recibida');
});

app.post('/user', (req, res)=>{
    console.log(req.body)
    res.send('peticion post recibida');
});

app.put('/contact', (req, res)=>{
    res.send('peticion put recibida');
});

app.put('/user/:id', (req, res)=>{
    console.log(req.body)
    res.send(`Usuario ${req.params.id} actualizado`);
});

app.delete('/test', (req, res)=>{
    res.send('peticion delete recibida');
});

app.delete('/user/:id', (req, res)=>{
    console.log(req.param)
    res.send(`User ${req.params.id}`);
});

//Se coloca al final porque sino entra a alguna de las otras rutas, cae aqui
app.use(express.static('public'));

app.listen(app.get('port'), ()=>{
    console.log(app.get('appName'))
    console.log('Server corriendo en el puerto ',app.get('port'))
});
