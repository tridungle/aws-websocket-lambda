import AWS from 'aws-sdk'

class Client {
  constructor(config) {
    this.client
    if (config) {
      this.setupClient(config)
    }
  }

  setupClient = async (event, context) => {
    const apiEndPoint = `${event.requestContext.domainName}/${event.requestContext.stage}`
    console.log('[setupClient][apiEndPoint][this.client]', apiEndPoint, this.client)

    if (!this.client) {
      this.client = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: apiEndPoint
      })
      console.log('[WSClient][send][this.client]', this.client)
    }
  }

  send = async (connectionId, payload) => {
    console.log('[WSClient][setupClient][this.client]', this.client)
    await this.client
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(payload)
      })
      .promise()
      .catch(async (err) => {
        console.log(`[wsClient][send][postToConnection] Error: ${JSON.stringify(err)}`)
      })

    return true
  }
}

export default { Client }
