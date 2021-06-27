/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnTypeOrm,
} from 'typeorm';
import { v1 as uuidv1 } from 'uuid';
import { IColumn } from './board.column.types';

/**
 * Column Interface.
 * @typedef IColumn
 * @prop {string|number|null|undefined} id - Column id
 * @prop {string} title - Column title
 * @prop {number} order - Column order
 */

/** Class representing a column. */
@Entity('column')
class Column implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnTypeOrm('text')
  title: string;

  @ColumnTypeOrm('integer')
  order: number;

  /**
   * Create a column.
   * @param {IColumn} IColumn - Column interface
   */
  constructor({ id = uuidv1(), title = '', order = 0 } = {}) {
    /**
     * Column id.
     * @type {string|number|null}
     */
    this.id = id;
    /**
     * Column title.
     * @type {string}
     */
    this.title = title;
    /**
     * Column order.
     * @type {number}
     */
    this.order = order;
  }
}

export default Column;
