'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateTableParams = translateTableParams;

var _tableItemMap = require('./tableItemMap');

var _tableItemMap2 = _interopRequireDefault(_tableItemMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultThroughput = {
  read: 10,
  write: 5
};

function translateKeySchema(keySchema) {
  var schema = [{
    KeyType: 'HASH',
    AttributeName: keySchema.hash[0]
  }];

  if (keySchema.range) {
    schema.push({
      KeyType: 'RANGE',
      AttributeName: keySchema.range[0]
    });
  }
  return schema;
}

function translateAttributeDefinition(key) {
  return {
    AttributeName: key[0],
    AttributeType: _tableItemMap2.default[key[1]]
  };
}

function translateAttributeDefinitions(keySchema) {
  return Object.keys(keySchema).map(function (key) {
    return translateAttributeDefinition(keySchema[key]);
  });
}

function translateLocalSecondaryIndex(index) {
  return {
    IndexName: index.indexName,
    KeySchema: translateKeySchema(index.keySchema),
    Projection: {
      ProjectionType: index.projectionType.toUpperCase()
    }
  };
}

function translateTableParams(name, params) {
  var throughput = params.throughput || defaultThroughput;

  var keySchema = translateKeySchema(params.keySchema);
  var attributeDefinitions = translateAttributeDefinitions(params.keySchema);
  var localSecondaryIndexes = null;

  // Check for Local Secondary Indexes
  if (params.localSecondaryIndexes) {
    localSecondaryIndexes = [];

    params.localSecondaryIndexes.forEach(function (index) {
      localSecondaryIndexes.push(translateLocalSecondaryIndex(index));
      attributeDefinitions.push(translateAttributeDefinition(index.keySchema.range));
    });
  }

  return {
    AttributeDefinitions: attributeDefinitions,
    TableName: name,
    KeySchema: keySchema,
    LocalSecondaryIndexes: localSecondaryIndexes,
    ProvisionedThroughput: {
      ReadCapacityUnits: throughput.read,
      WriteCapacityUnits: throughput.write
    }
  };
}