const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: 'simple-secret-key', // Change to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure cookies in production with HTTPS
}));

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'assets')));

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'homepage.html'));
});
app.get('/game', (req, res) => {
    req.session.attempts = 6;
    res.sendFile(path.join(__dirname, 'views', 'gamepage.html'));
});

// API endpoint for handling guesses
app.post('/game/guess', (req, res) => {
    if (req.session.attempts === undefined) {
        return res.status(400).json({ error: 'Game not started!' });
    }

    req.session.attempts -= 1;

    if (req.session.attempts <= 0) {
        res.json({ status: 'Sorry! You have run out of guesses.', message: 'The answer is:', attempts: 0 });
    } else {
        res.json({ status: `You have ${req.session.attempts} attempt(s) remaining.`, attempts: req.session.attempts });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
