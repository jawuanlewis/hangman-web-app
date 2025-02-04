const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes');
const MongoDBStore = require('connect-mongodb-session')(session);
const { connectToDB, closeConnection } = require('./config/db');

require('dotenv').config();

const app = express();

// Configure MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: process.env.DB_NAME,
  collection: 'sessions',
});

store.on('error', (error) => {
  console.error('Session store error:', error);
});

// CORS config based on environment
const allowedOrigins = [
  'http://localhost:5173',
  process.env.PROD_URL,
  process.env.STAGING_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = '(CORS) Access from this origin not allowed.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
      maxAge: null,
    },
  })
);

app.use((req, res, next) => {
  console.log("Session Middleware Debug:", req.session);
  next();
});

connectToDB();

// API endpoints
app.use('/api/game', gameRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// App shutdown
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});
