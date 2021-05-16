const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v1(), title, columns }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
