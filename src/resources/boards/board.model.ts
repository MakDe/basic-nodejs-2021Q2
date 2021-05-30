import uuid from 'uuid';
import Column from './board.column.model';

/**
 * Board interface.
 * @typedef IBoard
 * @prop {string|number|null|undefined} id - Board id
 * @prop {string} title - Board title
 * @prop {Array<IColumn>} columns - Board columns
 */

/** Class representing a board. */
class Board {
  /**
   * Create a board.
   * @param {IBoard} IBoard - Board interface
   */
  constructor({ id = uuid.v1(), title = '', columns } = {}) {
    /**
     * Board id.
     * @type {string|number|null}
     */
    this.id = id;
    /**
     * Board title.
     * @type {string}
     */
    this.title = title;
    /**
     * Board columns.
     * @type {Array<IColumn>}
     */
    this.columns = columns.map(
      (item) =>
        new Column({ id: item.id, title: item.title, order: item.order })
    );
  }

  /**
   * Creates a board instance and returns it.
   * @param {IBoard} body - The data from which the new board will be created
   * @return {IBoard} - Created board
   */
  static fromRequest(body) {
    return new Board(body);
  }
}

export default Board;
