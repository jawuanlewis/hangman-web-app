# hangman-web-app

Open [this link](https://hangman-web-app-466f2d94c639.herokuapp.com/) to access and play the game!

## Project Description

This is source code for my own personal, web-based version of the game **_Hangman_**.
There are 8 available themes of words for players to guess:

- movies, video games, sports, idioms, TV shows, food, animals, and cities

## Design & Planning

I used Figma to design and finalize the user interface, with some brief notes about backend control flow. Designs can be viewed <a href="https://www.figma.com/design/tOop8Aqlh0zycbjdERI0Ut/Hangman?node-id=0-1&t=uR8s9pxzcX4Zwzt0-1" target="_blank">here</a>.

- **Step 1:** Define the app's color scheme, typography, and iconography.
- **Step 2:** Begin designing global layout elements (Header, Nav Bar, Footer).
- **Step 3:** Design each page of the app one-by-one (starting with home page).

### Figma Best Practices

- I created each meaningful component of the interface as its own group, to ensure the project layers were organized and hierarchical.
- Made a separate page for each different display of the interface.
- Wrote some supplementary notes about the app logic.

## Technologies Used

**Frontend:**

- React.js
- Vite (local development/testing)
- HTML/CSS
- ESLint

**Backend**

- Node.js
- Express.js
- MongoDB

## Installation & Setup

**NOTE:** In order to actually run this project locally, you would need access to the database (which is not provided here). This is meant to be my own personal project, but I will still give setup instructions below.

1. Clone the repository

```
git clone https://github.com/jawuanlewis/hangman-web-app.git
```

2. Install dependencies

```
cd hangman-web-app
npm install
```

3. Set up environment variables

Create a .env file in the root directory that contains the following variables:

- **SESSION_SECRET:** can be any random, secret string
- **MONGO_URI:** uri to the MongoDB database
- **DB_NAME:** the database name

4. Run the development server

```
npm run dev
```

## Project Structure

```
hangman-web-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # React components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls to backend
│   │   ├── styles/        # CSS files for styling
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js     # Vite configuration
│
├── server/              # Node/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # APIs for game logic/routing
│   ├── routes/            # Express app routes
│   ├── app.js             # Express app setup
│   └── package.json
│
├── .gitignore
├── .prettierignore
├── package.json         # Project-wide scripts
└── README.md
```

## API Endpoints

```
POST /api/game/init      # Initialize game
GET /api/game/curr       # Get current game state
POST /api/game/guess     # Handle a user's guess
POST /api/game/reset     # Reset the game session
```

## Future Improvements

**Resource Changes:**

- Migrate from React to Redux for state management.
- Migrate from Express Sessions to MongoDB (or some resource) for managing game data.

**Future Features:**

- Add a main game page, with no particular theme and an increasing level of difficulty with each word.
- Generate small hints each time the user guesses incorrectly (potentially using OpenAI API).
- Add a multiplayer page.
- Add a "How to Play" page.

## Credits

- **Social Media Icons:** <a href="https://icons8.com" target="_blank">Icons8</a>
- **Level Images:** generated with <a href="https://labs.google/fx/tools/image-fx" target="_blank">ImageFX</a>
