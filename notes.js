console.log('Notes JS');
const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title  === title);

  if (duplicateNotes.length === 0 ) {
    notes.push(note);
    console.log('Adding Note', title, body);
    saveNotes(notes);
    return note;
  }
};

var removeNote = (title) => {
  console.log('Removing note with title', title);
  var notes = fetchNotes();
  var filtered = notes.filter((note) => note.title !== title);
  saveNotes(filtered)
  return notes.length !== filtered.length
}
var getNote = (title) => {
  var notes = fetchNotes();
  console.log('Fetching', title)
  var filtered = notes.filter((note) => note.title === title);
  return filtered[0];
}
var logNote = (note) => {
  console.log('---');
  console.log('Title:', note.title);
  console.log('Body:', note.body);
}
var getAll = () => {
  return fetchNotes();
}

module.exports = {
  addNote,
  getAll,
  removeNote,
  getNote,
  logNote
}

