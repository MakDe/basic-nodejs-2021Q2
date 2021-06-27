/* eslint-disable import/no-cycle */
import {
  Entity,
  Column as ColumnTypeOrm,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v1 as uuidv1 } from 'uuid';
import { IBoard } from 'src/resources/boards/board.types';

/**
 * Board interface.
 * @typedef IBoard
 * @prop {string|number|null|undefined} id - Board id
 * @prop {string} title - Board title
 * @prop {Array<IColumn>} columns - Board columns
 */

/** Class representing a board. */
@Entity('board')
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnTypeOrm()
  title: string;

  @ColumnTypeOrm({ type: 'json', nullable: true })
  columns: string;

  /**
   * Create a board.
   * @param {IBoard} IBoard - Board interface
   */
  constructor({ id = uuidv1(), title = '', columns = '' } = {}) {
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
    this.columns = columns;
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
