const createAuthorizedResponse = (resource) => {
  return {
    principalId: 'me',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: resource
        }
      ]
    }
  }
}

export const auth = async (event, context) => {
  console.log('[authorizer][auth] event: \n' + JSON.stringify(event, null, 2))
  const { headers, methodArn } = event

  // This is for demo purposes only.
  // This check is probably not valuable in production.
  if (headers['X-Forwarded-Proto'] === 'https') {
    return createAuthorizedResponse(methodArn)
  } else {
    throw new Error('Unauthorized')
  }
}
