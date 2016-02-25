'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = awsOptions;

var defaultApiVersion = '2012-08-10';

var defaultAwsOptions = {
  apiVersion: defaultApiVersion,
  retryHandler: function retryHandler(method, table) {
    console.log('retrying method', method, table);
  }
};

function awsOptions(options) {
  return Object.assign({}, defaultAwsOptions, options);
}