/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
const data = require('../data.json');

const showByName = (name, h) => {
  try {
    const query = decodeURI(name);

    const newData = data.filter((db) => new RegExp(query, 'i').test(db.name));

    if (newData.length === 0) {
      throw new Error(404);
    }

    return h.response({
      status: 'success',
      data: {
        books: newData,
      },
    })
      .code(200)
      .type('application/json');
  } catch (err) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
      .code(404)
      .type('application/json');
  }
};

const getByReading = (read, h) => {
  if (read == 0) {
    return h.response({
      status: 'success',
      data: {
        books: data.filter((db) => db.reading === false),
      },
    })
      .code(200)
      .type('application/json');
  } else if (read == 1) {
    return h.response({
      status: 'success',
      data: {
        books: data.filter((db) => db.reading === true),
      },
    })
      .code(200)
      .type('application/json');
  }
};

const getByFinished = (finished, h) => {
  if (finished == 0) {
    return h.response({
      status: 'success',
      data: {
        books: data.filter((db) => db.finished === false),
      },
    })
      .code(200)
      .type('application/json');
  } else if (finished == 1) {
    return h.response({
      status: 'success',
      data: {
        books: data.filter((db) => db.finished === true),
      },
    })
      .code(200)
      .type('application/json');
  }
};

const show = {
  getAllBooks(req, h) {
    const { name, reading, finished } = req.query;

    if (name) {
      return showByName(name, h);
    } else if (reading == 0 || reading == 1) {
      return getByReading(reading, h);
    } else if (finished == 0 || finished == 1) {
      return getByFinished(finished, h);
    }

    const newData = data.map((db) => ({
      id: db.id,
      name: db.name,
      publisher: db.publisher,
    }));

    return h.response({
      status: 'success',
      data: {
        books: newData,
      },
    })
      .code(200)
      .type('application/json; charset=utf-8');
  },
  getDetailBook(req, h) {
    try {
      const { bookid } = req.params;

      const detail = data.filter((db) => db.id === bookid);

      if (detail.length === 0) {
        throw new Error('404');
      }

      return h.response({
        status: 'success',
        data: {
          book: detail[0],
        },
      })
        .code(200)
        .type('application/json');
    } catch (err) {
      return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
      })
        .code(404)
        .type('application/json');
    }
  },
};

module.exports = show;
