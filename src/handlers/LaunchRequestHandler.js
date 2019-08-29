const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    const speechOutput = 'Welcome to Hello world, you can say Hello or Help. Which would you like to try?'
    const cardTitle = 'Hello world'

    return handlerInput.responseBuilder.
      speak(speechOutput).
      reprompt(speechOutput).
      withSimpleCard(cardTitle, speechOutput).
      getResponse()
  }
}

module.exports = LaunchRequestHandler
