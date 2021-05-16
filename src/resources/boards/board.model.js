const uuid = require('uuid');
const Column = require('./board.column.model');

class Board {
  constructor({ id = uuid.v1(), title, columns } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(
      (item) =>
        new Column({ id: item.id, title: item.title, order: item.order })
    );
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
