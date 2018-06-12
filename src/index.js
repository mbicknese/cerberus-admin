import './style'
import App from './components/app'
import { AxiosFactory } from './HttpAgent'
import { ClientGrant } from './HttpAgent/GrantStrategies'
import { clientId, clientSecret } from './config'

const buildClient = () => {
  const grant = new ClientGrant()
  grant.setCredentials(clientId, clientSecret)
  const factory = new AxiosFactory({ port: 8080 })
  factory.createAgent(grant).then(client => client.get('api/client'))
}

buildClient()

export default App
