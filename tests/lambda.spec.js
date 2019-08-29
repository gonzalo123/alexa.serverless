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
