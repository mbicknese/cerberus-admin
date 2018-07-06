import './style'
import App from './components/app'
import { AxiosFactory } from './HttpAgent'
import { ClientGrant } from './HttpAgent/GrantStrategies'
import { clientId, clientSecret } from './config'
import { PersistencePool, LocalStorage, InMemoryToken } from './HttpAgent/PersistenceStrategies'

const buildClient = () => {
  const grant = new ClientGrant()
  grant.setCredentials(clientId, clientSecret)
  const persistence = new PersistencePool(
    new LocalStorage(),
    new InMemoryToken()
  )
  const factory = new AxiosFactory({ port: 8080 })
  factory.createAgent(grant, persistence).then(client => client.get('api/client'))
}

buildClient()

export default App
