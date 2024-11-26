require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true in production with HTTPS
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'assets')));

// Routing
app.get('/', (req, res) => {
    res.render('homepage', { introMessage: 'Welcome! Choose a level to play below:' });
});
app.get('/game', (req, res) => {
    const level = req.query.level ? parseInt(req.query.level) : 1;

    // Initialize game state
    const levelSettings = {
        1: { level: 'Sports', attempts: 6, answer: 'ICE HOCKEY' },
        2: { level: 'Movies', attempts: 6, answer: 'THE GODFATHER' },
        3: { level: 'Video Games', attempts: 6, answer: 'SUPER MARIO ODYSSEY' },
        4: { level: 'Fun Phrases', attempts: 6, answer: 'DOWN FOR THE COUNT' }
    };
    const settings = levelSettings[level];

    req.session.level = settings.level;
    req.session.attempts = settings.attempts;
    req.session.answer = settings.answer;
    req.session.currentProgress = settings.answer.split('').map(char => (char === ' ' ? ' ' : '_')).join('');

    // Render the initial game page
    res.render('gamepage', {
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        statusMessage: `You have ${req.session.attempts} attempt(s) remaining.`,
        gameOver: false
    });
});

// API endpoint for handling guesses
app.post('/game/guess', (req, res) => {
    const guess = req.body.letter;
    const answer = req.session.answer;
    let currentProgress = req.session.currentProgress;

    let updatedProgress = '';
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) {
            updatedProgress += answer[i];
        } else {
            updatedProgress += currentProgress[i];
        }
    }

    if (updatedProgress === currentProgress) {
        req.session.attempts -= 1;
    }
    req.session.currentProgress = updatedProgress;

    let statusMessage = '';
    let gameOver = false;
    if (req.session.attempts <= 0) {
        req.session.currentProgress = answer;
        statusMessage = `Sorry! You have run out of guesses. The word is:`;
        gameOver = true;
    } else if (updatedProgress === answer) {
        statusMessage = `Congratulations! You have correctly guessed the word.`;
        gameOver = true;
    } else {
        statusMessage = `You have ${req.session.attempts} attempt(s) remaining.`;
    }

    res.json({
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        statusMessage,
        gameOver
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
