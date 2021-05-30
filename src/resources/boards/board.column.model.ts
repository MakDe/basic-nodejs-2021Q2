import uuid from 'uuid';

/**
 * Column Interface.
 * @typedef IColumn
 * @prop {string|number|null|undefined} id - Column id
 * @prop {string} title - Column title
 * @prop {number} order - Column order
 */

/** Class representing a column. */
class Column {
  /**
   * Create a column.
   * @param {IColumn} IColumn - Column interface
   */
  constructor({ id = uuid.v1(), title = '', order = 0 } = {}) {
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
