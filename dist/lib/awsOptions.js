'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = awsOptions;

var awsBaseOptions = {
  apiVersion: '2012-08-10',
  accesskeyid: process.env.AWS_ACCESS_KEY_ID,
  secretaccesskey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
  retryHandler: function retryHandler(method, table) {
    console.log('retrying method', method, table);
  }
};

function awsOptions(devOptions) {
  var result = undefined;

  if (process.env.NODE_ENV === 'production') {
    result = Object.assign({}, awsBaseOptions, devOptions);
  } else {
    result = Object.assign({}, awsBaseOptions, {
      sslEnabled: false,
      endpoint: 'http://:::45677'
    }, devOptions);
  }

  return result;
}