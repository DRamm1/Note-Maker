/* This is requiring the express module and setting it to the variable `express`. Then the variable
`app` is set to the express module. */
const express = require('express');
const app = express();

/* This is a variable that is used to set the port that the server will listen on. The
`process.env.PORT` is used to set the port to the port that is set by the host. If the host does not
set a port, then the port will be set to 3001. */
const PORT = process.env.PORT || 3001;


/* This is requiring the routes from the routes folder. */
const apiRoutes = require('./routes/apiRoutes/notesRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


/* This is a middleware that is used to route the requests to the appropriate route. */
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


/* This is a callback function that is called when the server is listening on the port. */
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});