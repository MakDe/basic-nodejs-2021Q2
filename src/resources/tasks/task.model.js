const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v1(),
    title = 'TITLE_TASK',
    order = 0,
    description = 'DESCRIPTION_TASK',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
