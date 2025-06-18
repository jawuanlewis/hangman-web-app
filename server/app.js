import express from 'express';
import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import MongoDBStore from 'connect-mongodb-session';
import { connectToDB, closeConnection } from './config/db.js';
import gameRoutes from './routes/gameRoutes.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);

// Configure MongoDB session store
const store = new MongoDBStore(session)({
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
  process.env.CUSTOM_URL,
  process.env.PROD_URL,
  process.env.STAGING_URL,
];

app.use(compression());

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
    proxy: true,
  })
);

connectToDB();

// API endpoints
app.use('/api/game', gameRoutes);

// Serve the frontend in production
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
