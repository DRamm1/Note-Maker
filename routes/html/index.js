
/* Requirements */
const path = require('path');
const router = require('express').Router();


/* This is a route that will send the user to the home page if they try to access the home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});


/* This is a route that will send the user to the notes page if they try to access the notes page. */
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});


/* This is a catch-all route that will send the user to the home page if they try to access a page that
doesn't exist. */
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

/* Exporting the router object so that it can be used in other files. */
module.exports = router;