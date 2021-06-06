import { v1 as uuidv1 } from 'uuid';
import { IColumn } from 'src/resources/boards/board.column.types';
import { IBoard } from 'src/resources/boards/board.types';
import Column from './board.column.model';

/**
 * Board interface.
 * @typedef IBoard
 * @prop {string|number|null|undefined} id - Board id
 * @prop {string} title - Board title
 * @prop {Array<IColumn>} columns - Board columns
 */

/** Class representing a board. */
class Board implements IBoard {
  id: string | number | null;

  title: string;

  columns: IColumn[];
  /**
   * Create a board.
   * @param {IBoard} IBoard - Board interface
   */
  constructor({ id = uuidv1(), title = '', columns }: IBoard) {
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
  static fromRequest(body: IBoard): IBoard {
    return new Board(body);
  }
}

export default Board;
