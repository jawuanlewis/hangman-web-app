const express = require('express');
const app = express();
const path = require('path');
//const db = require('./database');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the following directories
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'assets')));

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
app.get('/sports', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sports.html'));
});
app.get('/movies', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'movies.html'));
});
app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'games.html'));
});
app.get('/phrases', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'phrases.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
