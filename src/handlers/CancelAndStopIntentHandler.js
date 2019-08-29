const CancelAndStopIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle (handlerInput) {
    const speakOutput = 'Goodbye!'
    return handlerInput.responseBuilder.speak(speakOutput).getResponse()
  }
}

module.exports = CancelAndStopIntentHandler
