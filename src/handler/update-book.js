/* eslint-disable no-unneeded-ternary */
const fs = require('fs');
const path = require('path');
const data = require('../data.json');

const dataPath = path.resolve(__dirname, '../data.json');

const updateBook = (req, h) => {
  try {
    const { bookid } = req.params;
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

    const index = data.findIndex((db) => db.id === bookid);

    // validation
    if (index === -1) {
      throw new Error('404');
    } else if (name === '' || name === undefined || name === null) {
      throw new Error('Error Name');
    } else if (readPage > pageCount) {
      throw new Error('Error Read Page');
    }

    // updating data
    data[index] = {
      ...data[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished: pageCount === readPage,
      updatedAt: new Date().toISOString(),
    };

    // overwrite the data.json
    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
      if (err) throw new Error('Fail update');
    });

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    })
      .code(200)
      .type('application/json');
  } catch (err) {
    const msg = err.message;

    if (msg === '404') {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
      })
        .code(404)
        .type('application/json');
    } if (msg === 'Error Name') {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
        .code(400)
        .type('application/json');
    } if (msg === 'Error Read Page') {
      return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
        .code(400)
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

module.exports = updateBook;
