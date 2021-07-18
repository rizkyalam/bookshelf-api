/* eslint-disable no-unneeded-ternary */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');
const data = require('../data.json');

const dataPath = path.resolve(__dirname, '../data.json');

const insertBooks = (req, h) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    // validation
    if (name === '' || name === undefined || name === null) {
      throw new Error('Name is invalid !');
    } else if (readPage > pageCount) {
      throw new Error('Read page is invalid !');
    }

    const newData = {
      id: nanoid(16),
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading: reading === 'true' ? true : false,
      insertedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.push(newData);

    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
      if (err) throw new Error('Fail insert');
    });

    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newData.id,
      },
    }).code(201)
      .type('application/json');
  } catch (err) {
    const msg = err.message;

    if (msg === 'Name is invalid !') {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
        .code(400)
        .type('application/json');
    } if (msg === 'Read page is invalid !') {
      return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      }).code(400)
        .type('application/json');
    }
    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    })
      .code(500)
      .type('application/json');
  }
};

module.exports = insertBooks;
