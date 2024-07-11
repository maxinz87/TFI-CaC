const express = require('express');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/API/usersRoutes');
const articlesRoutes = require('./routes/API/articlesRoutes');
const categoriesRoutes = require('./routes/API/categoriesRoutes');

const puerto = 2408;

const app = express();

const apiDir = '/api';

app.use(cors());
app.use(express.json());
app.use(express.static('public',{index:false}));

app.use('/', require('./routes/mainRoutes'));
app.use(apiDir, userRoutes);
app.use(apiDir, articlesRoutes);
app.use(apiDir, categoriesRoutes);

/* cualquier solicitud envia a una web con el mensaje 404 */
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'./public','404.html'));
});

app.listen(puerto, ()=>{
    console.log(`Servidor activo desde el puerto ${puerto}`);
});