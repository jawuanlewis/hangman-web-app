require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Configure app and session storing in MongoDB
const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    databaseName: process.env.DB_NAME,
    collection: 'sessions'
});
store.on('error', (error) => {
    console.error('Session store error:', error);
});

const { connectToDB, getRandomWord, closeConnection } = require('./scripts/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'scripts')));

// Routing
app.get('/', async (req, res) => {
    await connectToDB();
    res.render('homepage', { introMessage: 'Welcome! Choose a level to play below:' });
});
app.get('/game', (req, res) => {
    res.render('gamepage', {
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        statusMessage: req.session.statusMessage,
        extraMessage: req.session.extraMessage,
        gameOver: req.session.gameOver
    });
});
app.get('/game/init', async (req, res) => {
    const answer = await getRandomWord(req.query.level.toLowerCase());

    req.session.level = req.query.level;
    req.session.attempts = 6;
    req.session.answer = answer;
    req.session.currentProgress = answer.split('').map(char => (char === ' ' ? ' ' : '_')).join('');
    req.session.gameOver = false;
    req.session.statusMessage = `You have ${req.session.attempts} attempt(s) remaining.`;
    req.session.extraMessage = "Guess a letter below:";

    res.redirect('/game');
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

    if (req.session.attempts <= 0) {
        req.session.currentProgress = answer;
        req.session.statusMessage = "Sorry! You have run out of guesses. The word is:";
        req.session.extraMessage = "";
        req.session.gameOver = true;
    } else if (updatedProgress === answer) {
        req.session.statusMessage = "Congratulations! You have correctly guessed the word.";
        req.session.extraMessage = "";
        req.session.gameOver = true;
    } else {
        req.session.statusMessage = `You have ${req.session.attempts} attempt(s) remaining.`;
    }

    res.json({
        level: req.session.level,
        attempts: req.session.attempts,
        currentProgress: req.session.currentProgress,
        statusMessage: req.session.statusMessage,
        extraMessage: req.session.extraMessage,
        gameOver: req.session.gameOver
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Close DB connection on app shutdown
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit(0);
});
