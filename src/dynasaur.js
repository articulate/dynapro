import AWS                                            from 'aws-sdk'
import awsOptions                                     from './lib/awsOptions'
import awsPromised                                    from './lib/awsPromised'
import { translateTableParams }                       from './lib/translateParams'
import { AttributeValue as attr }                     from 'dynamodb-data-types'
import { buildQueryFilters, buildFilter, itemParams } from './lib/helpers'

class Dynasaur {

  constructor(options={}) {
    this.db = new AWS.DynamoDB(awsOptions(options))
  }

  // createTable
  create(name, params) {
    return this.createTable(translateTableParams(name, params))
  }

  // describeTable
  describe(name) {
    return this.describeTable({ TableName: name })
  }

  // getItem
  find(tableName, params) {
    return this.getItem(itemParams(tableName, params))
      .then(data => attr.unwrap(data.Item))
  }

  // deleteItem
  remove(tableName, params) {
    return this.deleteItem(itemParams(tableName, params))
  }

  // updateItem
  update(tableName, params) {
    return this.updateItem(itemParams(tableName, params))
  }

  // putItem
  insert(tableName, params) {
    return this.putItem({
      TableName: tableName,
      Item: attr.wrap(params)
    })
  }

  // query
  where(tableName, params) {
    const awsParams = {
      TableName: tableName,
      IndexName: params.indexName || null,
      Limit: params.limit || null,
      KeyConditions: {},
      QueryFilter: {}
    }

    buildQueryFilters(awsParams.KeyConditions, params.keyConditions)
    buildQueryFilters(awsParams.QueryFilter, params.filters)

    return this.query(awsParams)
      .then(data => data.Items.map(item => attr.unwrap(item)))
  }
}

Object.assign(Dynasaur.prototype, awsPromised)

export default Dynasaur
