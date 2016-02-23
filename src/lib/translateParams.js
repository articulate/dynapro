import tableItemMap from './tableItemMap'

const defaultThroughput = {
  read: 10,
  write: 5
}

function translateKeySchema(keySchema) {
  let schema = [{
    KeyType: 'HASH',
    AttributeName: keySchema.hash[0]
  }]

  if (keySchema.range) {
    schema.push({
      KeyType: 'RANGE',
      AttributeName: keySchema.range[0]
    })
  }
  return schema
}

function translateAttributeDefinition(key) {
  return {
    AttributeName: key[0],
    AttributeType: tableItemMap[key[1]]
  }
}

function translateAttributeDefinitions(keySchema) {
  return Object.keys(keySchema).map((key) => translateAttributeDefinition(keySchema[key]))
}

function translateLocalSecondaryIndex(index) {
  return {
    IndexName: index.indexName,
    KeySchema: translateKeySchema(index.keySchema),
    Projection: {
      ProjectionType: index.projectionType.toUpperCase()
    }
  }
}

export function translateTableParams(name, params) {
  const throughput = params.throughput || defaultThroughput

  let keySchema = translateKeySchema(params.keySchema)
  let attributeDefinitions = translateAttributeDefinitions(params.keySchema)
  let localSecondaryIndexes = null

  // Check for Local Secondary Indexes
  if (params.localSecondaryIndexes) {
    localSecondaryIndexes = []

    params.localSecondaryIndexes.forEach((index) => {
      localSecondaryIndexes.push(translateLocalSecondaryIndex(index))
      attributeDefinitions.push(translateAttributeDefinition(index.keySchema.range))
    })
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
  }
}
