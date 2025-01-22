const express = require("express");
const cors = require("cors");
const session = require("express-session");
const gameRoutes = require("./routes/gameRoutes");
const MongoDBStore = require("connect-mongodb-session")(session);
const { connectToDB, closeConnection } = require("./config/db");

require("dotenv").config();

const app = express();

// Configure MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: process.env.DB_NAME,
  collection: "sessions",
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: process.env.NODE_ENV === "production" ? "auto" : false
    },
  })
);

connectToDB();

// API endpoints
app.use("/api/game", gameRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// App shutdown
process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});
