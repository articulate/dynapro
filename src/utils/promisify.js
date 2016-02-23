export default function promisify(fn, context) {
  const boundFn = fn.bind(context)

  return function(...args) {
    return new Promise((resolve, reject) => {
      boundFn(...args, (err, data) => err ? reject(err) : resolve(data))
    })
  }
}
