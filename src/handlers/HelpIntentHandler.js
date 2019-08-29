const HelpIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput) {
    const speakOutput = 'You can say hello to me! How can I help?'
    return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse()
  }
}

module.exports = HelpIntentHandler
