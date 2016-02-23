'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promisify = require('../utils/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Promise Wrapped SDK Methods //
var awsPromised = {
  batchGetItem: function batchGetItem(params) {
    return (0, _promisify2.default)(this.db.batchGetItem, this.db)(params);
  },
  batchWriteItem: function batchWriteItem(params) {
    return (0, _promisify2.default)(this.db.batchWriteItem, this.db)(params);
  },
  createTable: function createTable(params) {
    return (0, _promisify2.default)(this.db.createTable, this.db)(params);
  },
  deleteItem: function deleteItem(params) {
    return (0, _promisify2.default)(this.db.deleteItem, this.db)(params);
  },
  deleteTable: function deleteTable(params) {
    return (0, _promisify2.default)(this.db.deleteTable, this.db)(params);
  },
  describeTable: function describeTable(params) {
    return (0, _promisify2.default)(this.db.describeTable, this.db)(params);
  },
  getItem: function getItem(params) {
    return (0, _promisify2.default)(this.db.getItem, this.db)(params);
  },
  listTables: function listTables(params) {
    return (0, _promisify2.default)(this.db.listTables, this.db)(params);
  },
  putItem: function putItem(params) {
    return (0, _promisify2.default)(this.db.putItem, this.db)(params);
  },
  query: function query(params) {
    return (0, _promisify2.default)(this.db.query, this.db)(params);
  },
  scan: function scan(params) {
    return (0, _promisify2.default)(this.db.scan, this.db)(params);
  },
  updateItem: function updateItem(params) {
    return (0, _promisify2.default)(this.db.updateItem, this.db)(params);
  },
  updateTable: function updateTable(params) {
    return (0, _promisify2.default)(this.db.updateTable, this.db)(params);
  },
  waitFor: function waitFor(params) {
    return (0, _promisify2.default)(this.db.waitFor, this.db)(params);
  }
};

exports.default = awsPromised;