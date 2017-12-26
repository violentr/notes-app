//debugging node --inspect-brk app.js
//nodemon --inspect-brk app.js
//node inspect app.js
//repl
//debugger

console.log('Starting app');

const fs = require('fs');
const os = require('os');
var user = os.userInfo();
const _ = require('lodash');
const options = require('./options.js');
const yargs = require('yargs');
var notes = require('./notes.js');

//var filteredArray = _.uniq([1,2,3,4,3,5, 'Deniss', 3,3, 'Mike']);

const argv = yargs
.command('add', 'Add new note', {
  title: options.title,
  body: options.body
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title: options.title
})
.command('remove', 'remove a note', {
  title: options.title
})
.help()
.argv;
var parammeter = argv._[0] || 'not defined'

var message = 'Note was '
if (parammeter === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  message += note ? 'created' : 'not created'
  console.log(message)

}else if (parammeter === 'read'){
  var note = notes.getNote(argv.title)
  note.length !== 0 ? notes.logNote(note) : console.log(`${message}not found`)

}else if (parammeter === 'list'){
  var allNotes = notes.getAll();
  console.log(`You have ${allNotes.length} note(s)`)
  allNotes.forEach((note) => notes.logNote(note))

}else if (parammeter === 'remove'){
  var removedNote = notes.removeNote(argv.title)
  message += removedNote ? 'removed' : 'not removed'
  console.log(message)

}else {
  console.log('parammeter', parammeter)
}
