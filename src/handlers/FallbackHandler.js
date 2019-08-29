const FallbackHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
  },
  handle (handlerInput) {
    const speechOutput = 'Can you repeat it, please?'
    const cardTitle = 'Hello world'

    return handlerInput.responseBuilder.
      speak(speechOutput).
      reprompt(speechOutput).
      withSimpleCard(cardTitle, speechOutput).
      getResponse()
  }
}

module.exports = FallbackHandler
