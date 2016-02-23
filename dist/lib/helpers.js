'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQueryFilters = buildQueryFilters;
exports.buildFilter = buildFilter;
exports.itemParams = itemParams;

var _dynamodbDataTypes = require('dynamodb-data-types');

// Helper methods
function buildQueryFilters(target, filters) {
  var list = filters || [];

  return list.reduce(buildFilter, target);
}

function buildFilter(target, filter) {
  target[filter.column] = {
    ComparisonOperator: filter.op || 'EQ',
    AttributeValueList: [{}]
  };
  target[filter.column].AttributeValueList[0][filter.type || 'S'] = filter.value;

  return target;
}

function itemParams(tableName, params) {
  return {
    TableName: tableName,
    Key: _dynamodbDataTypes.AttributeValue.wrap(params)
  };
}