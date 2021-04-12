const { addNote, getNotes, getNote, updateNote, deleteNote } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNote,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getNotes,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNote,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNote,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNote,
  },
];

module.exports = routes;
