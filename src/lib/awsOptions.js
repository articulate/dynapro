const defaultApiVersion = '2012-08-10'

const defaultAwsOptions = {
  apiVersion: defaultApiVersion,
  retryHandler: (method, table) => {
    console.log('retrying method', method, table)
  }
}

export default function awsOptions(options) {
  return Object.assign({}, defaultAwsOptions, options)
}
