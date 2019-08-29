const HelloWorldIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent'
  },
  handle (handlerInput) {
    const speechOutput = 'Hello World'
    const cardTitle = 'Hello world'

    return handlerInput.responseBuilder.
      speak(speechOutput).
      reprompt(speechOutput).
      withSimpleCard(cardTitle, speechOutput).
      getResponse()
  }
}

module.exports = HelloWorldIntentHandler
