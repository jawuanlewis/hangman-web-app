const express = require('express');
const app = express();
const path = require('path');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve all the needed app files
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'assets')));

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gamepage.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
