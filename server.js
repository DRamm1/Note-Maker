const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// Notes api routes
const apiRoutes = require('./routes/apiRoutes/notesRoutes');
// Index html routes
const htmlRoutes = require('./routes/htmlRoutes');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// To use css and js from public file
app.use(express.static('public'));

// Use api and html routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Port selection
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});