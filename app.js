const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON
app.use(express.json());

// Use game routes
app.use('/', gameRoutes);

// Server configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));