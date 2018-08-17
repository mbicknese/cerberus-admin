import ClientParams from './clientParams'
import CerberusClient from './CerberusClient'
import { AxiosFactory, ClientGrant } from '../HttpAgent'
import { LocalStorage, PersistencePool, InMemoryToken } from '../HttpAgent/PersistenceStrategies'

const createClient = (params: ClientParams) => {
  const http = new AxiosFactory({ host: params.host, port: params.port, protocol: params.protocol })
  return new CerberusClient(http.createAgent(
    new ClientGrant(params.key, params.secret),
    new PersistencePool(new LocalStorage(), new InMemoryToken())
  ))
}

export default createClient
