/* Requirements */
const fs = require('fs');
const path = require('path');
const notesRouter = require('express').Router();
const uniqid = require('uniqid'); 


/* Importing the functions from the notes.js file. */
const { createNewNote, validateNote, deleteById } = require('../../lib/notes');


/* Importing the notes array from the db.json file. */
let notes = require('../../db/db');


/* This is a get request to the notesRouter. It is sending the notes array to the client. */
notesRouter.get('/notes', (req, res) => {
    res.json(notes);
});


/* This is a post request to the notesRouter. */
notesRouter.post('/notes', (req, res) => {

    // get note from request body
    req.body.id = uniqid();

    // validate note
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } 
    else {
        // if data is correct, create new note and send back to client
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});


/* This is a delete request to the notesRouter. */
notesRouter.delete('/notes/:id', (req, res) => {

    /* Filtering the notes array and returning a new array with the note that matches the id in the
    request parameters removed. */
    notes = notes.filter(note => note.id !== req.params.id);

    /* Writing the notes array to the db.json file. */
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    res.json({
        message: 'Note deleted.',
        data: notes
    })
});

/* Exporting the notesRouter object so that it can be used in other files. */
module.exports = notesRouter;
