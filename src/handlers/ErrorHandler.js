const log = require('../lib/log')

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    log.error('ERROR HANDLED', error.stack)
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse()
  }
}

module.exports = ErrorHandler
