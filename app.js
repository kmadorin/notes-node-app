const fs = require('fs');
const _  = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
  describe: 'Title of a note',
  demand: true,
  alias: 't'
}

const bodyOptions = {
    describe: 'Body of a note',
    demand: true,
    alias: 'b'
  }

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions,
  })
  .help()
  .argv;

var command = argv._[0];

if (command === 'add') {
  console.log('Adding new node');
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes`);
  allNotes.forEach((note)=>notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('note found');
    notes.logNote(note);
  } else {
    console.log('note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);

  var message = noteRemoved ? 'note was removed' : 'note was not found';
  console.log(message);
} else {
  console.log('Not recognized');
}