// Third Module
const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNote = (req, h) => {
  const { title = 'Untitled', tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const data = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(data);

  const isSucceeded = notes.filter((note) => note.id === id).length > 0;

  if (isSucceeded) {
    const res = h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      })
      .code(201);

    return res;
  }

  const res = h
    .response({
      status: 'fail',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);

  return res;
};

const getNotes = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNote = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: { note },
    };
  }

  const res = h
    .response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);

  return res;
};

const updateNote = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const res = h
      .response({
        status: 'success',
        message: 'Catatan berhasil diperbaharui',
      })
      .code(200);

    return res;
  }

  const res = h
    .response({
      status: 'fail',
      message: 'Catatan gagal diperbaharui, Id tidak ditemukan',
    })
    .code(404);

  return res;
};

const deleteNote = (req, h) => {
  const { id } = req.params;

  const i = notes.findIndex((note) => note.id === id);

  if (i !== -1) {
    notes.splice([i], 1);

    const res = h
      .response({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      })
      .code(200);

    return res;
  }

  const res = h
    .response({
      status: 'fail',
      message: 'Catatan gagal dihapus, Id tidak ditemukan',
    })
    .code(404);

  return res;
};

module.exports = {
  addNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
