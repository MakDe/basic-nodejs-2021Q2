const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v1(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }

  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
