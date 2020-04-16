// module.exports = {
function browserHasPromises() {
  return typeof Promise !== 'undefined'
}

function browserHasAsyncAwaitSupport() {
  return getAsyncCtor() !== null
}

function soon() {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve()
    }, 1)
  })
}

function getAsyncCtor() {
  try {
    eval("var func = async function() {}")
  }catch (e) {
    return null;
  }
  return Object.getPrototypeOf(func).constructor;
}
// }

module.exports = {
  browserHasPromises,
  browserHasAsyncAwaitSupport,
  soon,
}