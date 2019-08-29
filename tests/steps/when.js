async function viaHandler (functionPath, event, context) {
  const handler = require(`../../src/${functionPath}`)
  return await handler.handler(event)
}

module.exports.we_invoke_intent = (event) => {
  return viaHandler('index', event, {})
}

