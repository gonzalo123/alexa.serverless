const Alexa = require('ask-sdk-core')
const RequestInterceptor = require('./interceptors/RequestInterceptor')
const ResponseInterceptor = require('./interceptors/ResponseInterceptor')
const LaunchRequestHandler = require('./handlers/LaunchRequestHandler')
const HelloWorldIntentHandler = require('./handlers/HelloWorldIntentHandler')
const HelpIntentHandler = require('./handlers/HelpIntentHandler')
const CancelAndStopIntentHandler = require('./handlers/CancelAndStopIntentHandler')
const SessionEndedRequestHandler = require('./handlers/SessionEndedRequestHandler')
const FallbackHandler = require('./handlers/FallbackHandler')
const ErrorHandler = require('./handlers/ErrorHandler')

let skill

module.exports.handler = async (event, context) => {
  if (!skill) {
    skill = Alexa.SkillBuilders.custom().
      addRequestInterceptors(RequestInterceptor).
      addResponseInterceptors(ResponseInterceptor).
      addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        FallbackHandler).
      addErrorHandlers(
        ErrorHandler).
      create()
  }

  return await skill.invoke(event, context)
}
