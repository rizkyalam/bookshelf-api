const insertBooks = require('./handler/insert-books');
const { getAllBooks, getDetailBook } = require('./handler/show-books');
const updateBook = require('./handler/update-book');
const deleteBook = require('./handler/delete-book');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req, h) => h.response('Bookshelf API'),
  },
  {
    method: 'POST',
    path: '/books',
    handler: insertBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookid}',
    handler: getDetailBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookid}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookid}',
    handler: deleteBook,
  },
];

module.exports = routes;
