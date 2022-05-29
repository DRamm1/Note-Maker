/*  requirements */
const fs = require("fs");
const path = require("path");


/**
 * The function takes in a note object and an array of note objects. It then pushes the new note object
 * into the array of note objects and writes the array of note objects to the db.json file.
 * @param body - {
 * @param notesArray - an array of objects
 * @returns The notesArray is being returned.
 */
function createNewNote(body, notesArray) {

    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
  
    return notesArray;
};


/**
 * It returns true if the note has a title and text that are both strings, and false otherwise
 * @param note - The note object to validate.
 * @returns a boolean value.
 */
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.title !== 'string') {
      return false;
    }
    return true;
};



/**
 * It takes in an id and an array of notes, filters out the note with the matching id, and then writes
 * the remaining notes to the db.json file.
 * @param id - the id of the note to delete
 * @param notes - the array of notes
 * @returns The notes array.
 */
function deleteById(id, notes) {
    notes = notes.filter(note => note.id !== id);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    return notes;
};

module.exports = { createNewNote, validateNote, deleteById };