const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log('Servicio corriendo...', PORT);
});

const movies = [
    { id: 1, name: 'The Notebook', movieGenres: 'Drama', estrellas: 5, cine:"No", ciudad:"CDMX"  },
    { id: 2, name: 'Star Wars', movieGenres: 'Sciencia ficcion', estrellas: 5, cine:"No", ciudad:"CDMX"},
    { id: 3, name: 'El Conjuro', movieGenres: 'Terror', estrellas: 5, cine:"No", ciudad:"CDMX" },
];

app.get('/inicio', (req, res) => {
    res.send('Hola estas en la app de Peliculas!');
});

//getMovies Get
app.get('/movies/:id?', (req, res) => {
    console.log(req.query.genre);
    console.log(req.params.id);
    res.status(200).json(movies);
});

app.post('/movies', (req, res) => {
    const newMovie = req.body;
    movies.push(newMovie); 
    res.status(201).send({ message: 'Película agregada correctamente' });
});

app.patch('/movies/:id', (req, res) => {
    const id = req.params.id;
    const newMovie = req.body;
    const position = movies.findIndex(element => element.id === parseInt(id));
    movies[position] = { ...movies[position], ...newMovie }
    res.status(200).json({ id, message: 'Los campos de la pelicula requeridos se modificaron' });

});

app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    const newMovie = req.body;
    const position = movies.findIndex(element => element.id === parseInt(id));
    movies[position] = newMovie;
    res.status(200).json({ id, message: 'Se modificó toda la información' });
});

app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    const position = movies.findIndex(e => e.id === parseInt(id)); //findIndex posision que cumple una condicion
    movies.splice(position, 1);
    res.status(200).json({ id });
});