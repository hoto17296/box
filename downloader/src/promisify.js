module.exports = function(original) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      original.bind(this)(...args, (err, ...values) => {
        if (err) reject(err);
        else resolve(...values);
      })
    })
  }
}
