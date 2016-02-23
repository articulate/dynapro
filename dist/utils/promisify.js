"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promisify;
function promisify(fn, context) {
  var boundFn = fn.bind(context);

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      boundFn.apply(undefined, args.concat([function (err, data) {
        return err ? reject(err) : resolve(data);
      }]));
    });
  };
}