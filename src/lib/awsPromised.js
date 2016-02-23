import promisify from '../utils/promisify'

  // Promise Wrapped SDK Methods //
const awsPromised = {

  batchGetItem(params) {
    return promisify(this.db.batchGetItem, this.db)(params)
  },

  batchWriteItem(params) {
    return promisify(this.db.batchWriteItem, this.db)(params)
  },

  createTable(params) {
    return promisify(this.db.createTable, this.db)(params)
  },

  deleteItem(params) {
    return promisify(this.db.deleteItem, this.db)(params)
  },

  deleteTable(params) {
    return promisify(this.db.deleteTable, this.db)(params)
  },

  describeTable(params) {
    return promisify(this.db.describeTable, this.db)(params)
  },

  getItem(params) {
    return promisify(this.db.getItem, this.db)(params)
  },

  listTables(params) {
    return promisify(this.db.listTables, this.db)(params)
  },

  putItem(params) {
    return promisify(this.db.putItem, this.db)(params)
  },

  query(params) {
    return promisify(this.db.query, this.db)(params)
  },

  scan(params) {
    return promisify(this.db.scan, this.db)(params)
  },

  updateItem(params) {
    return promisify(this.db.updateItem, this.db)(params)
  },

  updateTable(params) {
    return promisify(this.db.updateTable, this.db)(params)
  },

  waitFor(params) {
    return promisify(this.db.waitFor, this.db)(params)
  }

}

export default awsPromised
