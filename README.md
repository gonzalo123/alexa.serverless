## Alexa skill example with Serverless framework

Today I want to play with Alexa and serverless. I've created a dummy hello world script. In fact this example is more or less the official example hello-world sample.

```javascript
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
```

It has one Intent that answers to hello command.

```javascript
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
```

I'm using serverless framework to deploy the skill. I know that serverless frameworks has plugins for alexa skills that helps us to create the whole skill, but in this example I want to do it a little more manually (it's the way that I learn new things).

First I create the skill in the Alexa developer console (or via ask cli). There're a lot of tutorials about it. Then I take my alexaSkill id and I use this id within my serverless config file as the trigger event of my lambda function.

```yaml
service: hello-world

provider:
  name: aws
  runtime: nodejs8.10
  region: ${opt:region, self:custom.defaultRegion}
  stage: ${opt:stage, self:custom.defaultStage}

custom:
  defaultRegion: eu-west-1
  defaultStage: prod

functions:
  info:
    handler: src/index.handler
    events:
      - alexaSkill: amzn1.ask.skill.my_skill
```

then I deploy the lambda function
> npx serverless deploy --aws-s3-accelerate

And I take the arn of the lambda function and I use this lambda as my endpoint in the Alexa developer console.

Also we can test our skill (at least the lambda function) using our favorite testing framework. I will use jest in this example.
Testing is very important, at least for me, when I'm working with lambdas and serverless. I want to test my script locally, instead of deploying to aws again and again (it's slow).

```javascript
const when = require('./steps/when')
const { init } = require('./steps/init')

describe('When we invoke the skill', () => {
  beforeAll(() => {
    init()
  })

  test('launch intent', async () => {
    const res = await when.we_invoke_intent(require('./events/use_skill'))
    const card = res.response.card
    expect(card.title).toBe('Hello world')
    expect(card.content).toBe('Welcome to Hello world, you can say Hello or Help. Which would you like to try?')
  })

  test('help handler', async () => {
    const res = await when.we_invoke_intent(require('./events/help_handler'))
    console.log(res.response.outputSpeech.ssml)
    expect(res.response.outputSpeech.ssml).toBe('<speak>You can say hello to me! How can I help?</speak>')
  })

  test('Hello world handler', async () => {
    const res = await when.we_invoke_intent(require('./events/hello_world_handler'))
    const card = res.response.card
    expect(card.title).toBe('Hello world')
    expect(card.content).toBe('Hello World')
  })
})
```




