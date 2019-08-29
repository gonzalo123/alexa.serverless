function getResolvedSlotIDValue (request, slotName) {
  // assumes the first resolved value's id is the desired one
  const slot = request.intent.slots[slotName]

  if (slot &&
    slot.value &&
    slot.resolutions &&
    slot.resolutions.resolutionsPerAuthority &&
    slot.resolutions.resolutionsPerAuthority[0] &&
    slot.resolutions.resolutionsPerAuthority[0].values &&
    slot.resolutions.resolutionsPerAuthority[0].values[0] &&
    slot.resolutions.resolutionsPerAuthority[0].values[0].value &&
    slot.resolutions.resolutionsPerAuthority[0].values[0].value.name) {
    return slot.resolutions.resolutionsPerAuthority[0].values[0].value.id
  }
  return null
}

const RequestInfoHandler = {
  canHandle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    return (request.type === 'IntentRequest'
      && request.intent.name === 'RequestInfoIntent')
  },
  handle (handlerInput) {
    const request = handlerInput.requestEnvelope.request
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes()
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
    const repromptOutput = requestAttributes.t('FOLLOW_UP_MESSAGE')
    let speakOutput = ''

    // fetch id for slot value
    let inquiryTypeId = getResolvedSlotIDValue(request, 'infoTypeRequested')
    if (!inquiryTypeId) {
      inquiryTypeId = 'fullProfile'
      speakOutput += requestAttributes.t('NOT_SURE_OF_TYPE_MESSAGE')
    }
    // add full name to the response, if requested
    if (inquiryTypeId === 'fullName' || inquiryTypeId === 'fullProfile') {
      const fullName = requestAttributes.t('FULL_NAME', sessionAttributes.firstName, sessionAttributes.surname)
      speakOutput += requestAttributes.t('REPORT_NAME', fullName)
    }
    // add phone number to the response, if requested
    if (inquiryTypeId === 'phoneNumber' || inquiryTypeId === 'fullProfile') {
      speakOutput += requestAttributes.t('REPORT_PHONE_NUMBER', sessionAttributes.phoneNumber)
    }
    // add email address to the response, if requested
    if (inquiryTypeId === 'emailAddress' || inquiryTypeId === 'fullProfile') {
      speakOutput += requestAttributes.t('REPORT_EMAIL_ADDRESS', sessionAttributes.emailAddress)
    }
    // add street address to the response, if requested
    if (inquiryTypeId === 'streetAddress' || inquiryTypeId === 'fullProfile') {
      speakOutput += requestAttributes.t('REPORT_STREET_ADDRESS', sessionAttributes.streetAddress)
    }

    speakOutput += repromptOutput

    return handlerInput.responseBuilder.speak(speakOutput).reprompt(repromptOutput).getResponse()
  }
}

module.exports = RequestInfoHandler
