'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _awsOptions = require('./lib/awsOptions');

var _awsOptions2 = _interopRequireDefault(_awsOptions);

var _awsPromised = require('./lib/awsPromised');

var _awsPromised2 = _interopRequireDefault(_awsPromised);

var _translateParams = require('./lib/translateParams');

var _dynamodbDataTypes = require('dynamodb-data-types');

var _helpers = require('./lib/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dynapro = function () {
  function Dynapro() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Dynapro);

    this.db = new _awsSdk2.default.DynamoDB((0, _awsOptions2.default)(options));
  }

  // createTable


  _createClass(Dynapro, [{
    key: 'create',
    value: function create(name, params) {
      return this.createTable((0, _translateParams.translateTableParams)(name, params));
    }

    // describeTable

  }, {
    key: 'describe',
    value: function describe(name) {
      return this.describeTable({ TableName: name });
    }

    // getItem

  }, {
    key: 'find',
    value: function find(tableName, params) {
      return this.getItem((0, _helpers.itemParams)(tableName, params)).then(function (data) {
        return _dynamodbDataTypes.AttributeValue.unwrap(data.Item);
      });
    }

    // deleteItem

  }, {
    key: 'remove',
    value: function remove(tableName, params) {
      return this.deleteItem((0, _helpers.itemParams)(tableName, params));
    }

    // updateItem

  }, {
    key: 'update',
    value: function update(tableName, params, fields) {
      var props = Object.keys(fields).reduce(function (memo, current) {
        return memo.concat(_defineProperty({}, current, fields[current]));
      }, []);

      var AttributeUpdates = props.reduce(function (memo, current) {
        return memo.put(current);
      }, _dynamodbDataTypes.AttributeValueUpdate);

      var updateParams = Object.assign({}, (0, _helpers.itemParams)(tableName, params), { AttributeUpdates: AttributeUpdates });

      return this.updateItem(updateParams);
    }

    // putItem

  }, {
    key: 'insert',
    value: function insert(tableName, params) {
      return this.putItem({
        TableName: tableName,
        Item: _dynamodbDataTypes.AttributeValue.wrap(params)
      });
    }

    // query

  }, {
    key: 'where',
    value: function where(tableName, params) {
      var awsParams = {
        TableName: tableName,
        IndexName: params.indexName || null,
        Limit: params.limit || null,
        ScanIndexForward: params.scanIndexForward === undefined ? true : params.scanIndexForward,
        ExclusiveStartKey: params.exclusiveStartKey || null,
        KeyConditions: {},
        QueryFilter: {}
      };

      (0, _helpers.buildQueryFilters)(awsParams.KeyConditions, params.keyConditions);
      (0, _helpers.buildQueryFilters)(awsParams.QueryFilter, params.filters);

      return this.query(awsParams).then(function (data) {
        var Items = data.Items.map(function (item) {
          return _dynamodbDataTypes.AttributeValue.unwrap(item);
        });

        return Object.assign({}, data, { Items: Items });
      });
    }
  }]);

  return Dynapro;
}();

Object.assign(Dynapro.prototype, _awsPromised2.default);

exports.default = Dynapro;