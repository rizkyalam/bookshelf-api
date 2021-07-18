const fs = require('fs');
const path = require('path');
const data = require('../data.json');

const dataPath = path.resolve(__dirname, '../data.json');

const deleteBook = (req, h) => {
  try {
    const { bookid } = req.params;

    const index = data.findIndex((db) => db.id === bookid);

    if (index === -1) {
      throw new Error('404');
    }

    data.splice(index, 1);

    // overwrite the data.json
    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
      if (err) throw new Error('Fail update');
    });

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200)
      .type('application/json');
  } catch (err) {
    if (err.message === '404') {
      return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
        .code(404)
        .type('application/json');
    }
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus.',
    })
      .code(500)
      .type('application/json');
  }
};

module.exports = deleteBook;
