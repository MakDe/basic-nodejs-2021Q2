const uuid = require('uuid');

class Column {
  constructor({ id = uuid.v1(), title, order }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;