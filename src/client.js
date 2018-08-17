import { createClient } from './Cerberus'
import * as config from './config'

const client = createClient({
  host: config.apiHost,
  port: config.apiPort,
  protocol: config.apiProtocol,
  key: config.clientId,
  secret: config.clientSecret
})

export default client
