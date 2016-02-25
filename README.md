# Dynapro

Dynapro is a thin promised-based wrapper around Amazon's AWS DynamoDB SDK.  This is currently being actively developed and contributions are welcome.  NPM package located at https://www.npmjs.com/package/dynapro.

## Installation

    $ npm install dynapro

## Usage

    var Dynapro = require('dynapro')

    var options = {
      region: 'xxx',
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx'
    }

    var dynapro = new Dynapro(options)

### Describe table

    dynapro.describe('table name')
      .then(function(data) {
        console.log(data.Table.TableStatus)
      }).catch(function(err) {
        console.log('Table does not exist', err)
      })

### Create table

    // key types [string | stringSet | number | numberSet | binary | binarySet

    var params: {
      keySchema: {
        hash: ['author', 'string'],
        range: ['id', 'string']
      },

      // Optional secondary index
      localSecondaryIndexes: [{
        indexName: 'orderIndex',
        keySchema: {
          hash: ['author', 'string'],
          range: ['order', 'number']
        },
        projectionType: 'ALL'
      }]
    }

    dynapro.create('table name', params)
      .then(successFunction)
      .catch(console.log)

### Find (getItem)

    var params = {
      courseId: "123",
      author: "Mike"
    }

    dynapro.find('table name', params)
      .then(function(data) {
        console.log('result', data)
      }).catch(console.log)

### Insert (putItem)

    var params = {
      courseId: "123",
      author: "Mike"
    }

    dynapro.insert('table name', params)
      .then(function(data) {
        console.log('Successfully inserted item')
      }).catch(console.log)

### Where (query)

    var params = {
      keyConditions: [{
        column: 'author',
        value: 'Mike'
      }],
      indexName: 'orderIndex' // optional (query an index)
    }

    dynapro.where('table name', params)
      .then(function(results) {
        console.log('results', results)
      }).catch(console.log)

## License

This software is provided under the the [MIT license](LICENSE).
