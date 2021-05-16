const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v1(),
    title = 'TEST_TITLE_BOARD',
    columns = { id: null, title: 'TEST_TITLE_COLUMN', order: 0 },
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
