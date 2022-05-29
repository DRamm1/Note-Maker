let TitleNote;
let textNote;
let addNote;
let listNote;
let save;

/* Checking if the user is on the notes page. If they are, it will add event listeners to the
save, addNote, TitleNote, and textNote. */
if (window.location.pathname === '/notes') {
  TitleNote = document.querySelector('.note-title');
  addNote = document.querySelector('.new-note');
  textNote = document.querySelector('.note-textarea');
  listNote = document.querySelectorAll('.list-container .list-group');
  save = document.querySelector('.save-note');
}


/**
 * display" is a function that takes an element as an argument and sets the display property of that
 * element to "inline
 * @param elem - The element to display.
 */
const display = (elem) => {
  elem.style.display = 'inline';
};


/**
 * This function takes an element as an argument and sets its display property to none.
 * @param elem - The element to hide.
 */
const hide = (elem) => {
  elem.style.display = 'none';
};


/* Creating an empty object. */
let activeNote = {};

/**
 * It makes a GET request to the /api/notes endpoint and returns the response
 */
const pullNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
 * It sends a DELETE request to the server, which deletes the note with the given id
 * @param id - The id of the note to delete.
 */
const delNote = (id) =>
fetch(`/api/notes/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * It sends a POST request to the /api/notes endpoint with the note object as the body
 * @param note - The note object to save.
 */
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });


/**
 * If the activeNote.id is true, then set the TitleNote and textNote to readonly, and set the value of
 * TitleNote and textNote to activeNote.title and activeNote.text. Otherwise, remove the readonly
 * attribute from TitleNote and textNote, and set the value of TitleNote and textNote to an empty
 * string.
 */
const displayActive = () => {
  hide(save);

  if (activeNote.id) {
    textNote.setAttribute('readonly', true);
    TitleNote.setAttribute('readonly', true);
    textNote.value = activeNote.text;
    TitleNote.value = activeNote.title;
  } else {
    textNote.removeAttribute('readonly');
    TitleNote.removeAttribute('readonly');
    TitleNote.value = '';
    textNote.value = '';
  }
};

/**
 * When the user clicks the save button, the function will grab the title and text of the note, save it
 * to the database, and then render the notes and active note.
 */
const handleNoteSave = () => {
  const newNote = {
    text: textNote.value,
    title: TitleNote.value,
  };

  saveNote(newNote).then(() => {
    RenNote();
    displayActive();
  });
};


/**
 * "When the delete button is clicked, the note is deleted from the database and the page is
 * re-rendered."
 * 
 * The first thing we do is stop the event from propagating. This is because we have an event listener
 * on the entire note element, and we don't want the event to bubble up to the note element and trigger
 * the noteViewFunction function.
 * 
 * Next, we get the noteId from the data-note attribute on the note element.
 * 
 * Then, we check if the note we're deleting is the active note. If it is, we set activeNote to an
 * empty object.
 * 
 * Finally, we call the delNote function, which will delete the note from the database. Once the
 * note is deleted, we call RenNote and displayActive to re-render the page.
 * @param e - The event object
 */
const noteDelFunction = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  delNote(noteId).then(() => {
    RenNote();
    displayActive();
  });
};


/**
 * When the user clicks on a note, the note's data is parsed from the data-note attribute and stored in
 * the activeNote variable, then the activeNote is rendered.
 * @param e - the event object
 */
const noteViewFunction = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  displayActive();
};


/**
 * If the note title or note text is empty, hide the save button. Otherwise, display the save button.
 */
 const genSaveBtn = () => {
  if (!TitleNote.value.trim() || !textNote.value.trim()) {
    hide(save);
  } else {
    display(save);
  }
};

/**
 * When the user clicks the add note button, the activeNote variable is set to an empty object, and the
 * displayActive function is called.
 * @param e - the event object
 */
const noteView = (e) => {
  activeNote = {};
  displayActive();
};

/**
 * It takes a list of notes, and renders them to the page.
 * @param notes - fetch('http://localhost:3000/notes')
 */
const RenNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    listNote.forEach((el) => (el.innerHTML = ''));
  }

  let listNoteItems = [];


/**
 * It creates a list item element, adds a class to it, creates a span element, adds a class to it, adds
 * text to it, adds an event listener to it, and appends it to the list item element.
 * @param text - the text of the note
 * @param [delBtn=true] - true
 */
  const makeLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('listGroup');

    const makeSpan = document.createElement('span');
    makeSpan.classList.add('listTitle');
    makeSpan.innerText = text;
    makeSpan.addEventListener('click', noteViewFunction);

    liEl.append(makeSpan);

/* Creating a delete button for each note. */
    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', noteDelFunction);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  /* This is checking if the user is on the notes page. If they are, it will add event listeners to the
  
  save, addNote, TitleNote, and textNote. */
  if (jsonNotes.length === 0) {
    listNoteItems.push(makeLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = makeLi(note.title);
    li.dataset.note = JSON.stringify(note);

    listNoteItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    listNoteItems.forEach((note) => listNote[0].append(note));
  }
};


/**
 * Get the notes from the API, then render the note list.
 */
const RenNote = () => pullNotes().then(RenNoteList);

/* This is checking if the user is on the notes page. If they are, it will add event listeners to the
save, addNote, TitleNote, and textNote. */
if (window.location.pathname === '/notes') {
  save.addEventListener('click', handleNoteSave);
  TitleNote.addEventListener('keyup', genSaveBtn);
  textNote.addEventListener('keyup', genSaveBtn);
  addNote.addEventListener('click', noteView);
}

RenNote();