import Axios from 'axios'

import './style'
import App from './components/app'
import createClient from './oAuth'
import ClientStrategy from './oAuth/GrantStrategies/ClientStrategy'
import { clientId, clientSecret } from './config'

const buildClient = async () => {
  const grant = new ClientStrategy
  grant.setCredentials(clientId, clientSecret)
  const client = await createClient(grant, Axios)

  // Proof of concept
  client.get('api/client')
}

buildClient()

export default App
