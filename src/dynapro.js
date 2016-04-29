import AWS                                            from 'aws-sdk'
import awsOptions                                     from './lib/awsOptions'
import awsPromised                                    from './lib/awsPromised'
import { translateTableParams }                       from './lib/translateParams'
import { AttributeValue as attr,
         AttributeValueUpdate as attrUpdate }         from 'dynamodb-data-types'
import { buildQueryFilters, buildFilter, itemParams } from './lib/helpers'

class Dynapro {

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
  update(tableName, params, fields) {
    const props = Object.keys(fields).reduce((memo, current) => memo.concat({ [current]: fields[current] }), [])

    const AttributeUpdates  = props.reduce((memo, current) => memo.put(current), attrUpdate)
    const updateParams      = Object.assign({}, itemParams(tableName, params), { AttributeUpdates })

    return this.updateItem(updateParams)
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
      ScanIndexForward: params.scanIndexForward === undefined ? true : params.scanIndexForward,
      KeyConditions: {},
      QueryFilter: {}
    }

    buildQueryFilters(awsParams.KeyConditions, params.keyConditions)
    buildQueryFilters(awsParams.QueryFilter, params.filters)

    return this.query(awsParams)
      .then(data => data.Items.map(item => attr.unwrap(item)))
  }
}

Object.assign(Dynapro.prototype, awsPromised)

export default Dynapro
