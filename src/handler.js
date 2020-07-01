import ws from './websocket'
const wsClient = new ws.Client()

const success = {
  statusCode: 200
}


const connectionManager = async (event, context) => {
  console.log(`[handler][connectionManager] event:`, event)
  console.log(`[handler][connectionManager] wsClient:`, wsClient)
  
  await wsClient.setupClient(event)
  console.log(`[handler][connectionManager] eventType:`, event.requestContext.eventType)

  if (event.requestContext.eventType === 'CONNECT') {
    await subscribeChannel(
      {
        ...event,
        body: JSON.stringify({
          action: 'subscribe',
          channelId: 'booking'
        })
      },
      context
    )
    return success
  }

  if (event.requestContext.eventType === 'DISCONNECT') {
    return success
  }
}

const defaultMessage = async (event, context) => {
  console.log(`[handler][defaultMessage] event:`, event)
  await wsClient.setupClient(event)
  const connectionId = event.requestContext.connectionId

  await wsClient.send(connectionId, {
    connectionId,
    event: 'error',
    message: 'invalid action type'
  })

  return success
}

const sendMessage = async (event, context) => {
  console.log(`[handler][sendMessage] event:`, event)
  const body = JSON.parse(event.body)
  const connectionId = event.requestContext.connectionId
  await wsClient.send(connectionId, {
    event: 'channel_message',
    channelId: body.channelId,
    name,
    content
  })

  return success
}

const responseMessage = async (event, context) => {
  const body = JSON.parse(event.body)
  return {
    statusCode: 200,
    body: `Hello, ${body.name}`
  }
}
const broadcast = async (event, context) => {
  return success
}

const channelManager = async (event, context) => {
  const action = JSON.parse(event.body).action
  switch (action) {
    case 'subscribeChannel':
      await subscribeChannel(event, context)
      break
    case 'unsubscribeChannel':
      await unsubscribeChannel(event, context)
      break
    default:
      break
  }

  return success
}

const subscribeChannel = async (event, context) => {
  const connectionId = event.requestContext.connectionId
  const channelId = event.requestContext.channelId
  console.log(`[handler][subscribeChannel] :`, channelId, connectionId)

  return success
}

const unsubscribeChannel = (event, context) => {
  return success
}

export {
  connectionManager,
  defaultMessage,
  sendMessage,
  broadcast,
  subscribeChannel,
  unsubscribeChannel,
  channelManager,
  responseMessage
}
