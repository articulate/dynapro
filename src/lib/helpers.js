import { AttributeValue as attr } from 'dynamodb-data-types'

// Helper methods
export function buildQueryFilters(target, filters) {
  const list = filters || []

  return list.reduce(buildFilter, target)
}

export function buildFilter(target, filter) {
  target[filter.column] = {
    ComparisonOperator: filter.op || 'EQ',
    AttributeValueList: [{}]
  }
  target[filter.column].AttributeValueList[0][filter.type || 'S'] = filter.value

  return target
}

export function itemParams(tableName, params) {
  return {
    TableName: tableName,
    Key: attr.wrap(params)
  }
}
