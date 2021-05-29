const uuid = require('uuid');

/**
 * Task Interface.
 * @typedef ITask
 * @prop {string} id - Task id
 * @prop {string} title - Task title
 * @prop {number} order - Task order
 * @prop {string} description - Task description
 * @prop {string} userId - User id
 * @prop {string} boardId - Board id
 * @prop {string} columnId - Column id
 */

/** Class representing a task. */
class Task {
  /**
   * Create a taks.
   * @param {ITask} ITask - Task interface
   */
  constructor({
    id = uuid.v1(),
    title = '',
    order = 0,
    description = '',
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    /**
     * Task id.
     * @type {string}
     */
    this.id = id;
    /**
     * Task title.
     * @type {string}
     */
    this.title = title;
    /**
     * Task order.
     * @type {number}
     */
    this.order = order;
    /**
     * Task description.
     * @type {string}
     */
    this.description = description;
    /**
     * Task userId.
     * @type {string}
     */
    this.userId = userId;
    /**
     * Task boardId.
     * @type {string}
     */
    this.boardId = boardId;
    /**
     * Task columnId.
     * @type {string}
     */
    this.columnId = columnId;
  }

  /**
   * Creates a task instance and returns it.
   * @param {ITask} body - The data from which the new task will be created
   * @return {ITask} - Created task
   */
  static fromRequest(body) {
    return new Task(body);
  }
}

module.exports = Task;
