import Axios, { AxiosStatic, AxiosInstance } from 'axios'
import GrantStrategy from './GrantStrategies/GrantStrategy'
import ServerConfig from './ServerConfig'
import { PersistenceStrategy, InMemoryToken } from './PersistenceStrategies'
import forbiddenInterceptor from './forbiddenInterceptor'

const defaultServer: ServerConfig = {
  host: 'localhost',
  port: 80,
  protocol: 'http',
  path: '/'
}

/**
 * Factory to build an HTTP agent based upon Axios
 */
export default class AxiosFactory {
  private baseUrl: string

  constructor (server: Partial<ServerConfig> = {}) {
    const { protocol, host, port, path } = {...defaultServer, ...server}
    this.baseUrl = `${protocol}://${host}:${port}${path}`
  }

  public async createAgent (
    grant: GrantStrategy,
    persistence: PersistenceStrategy = new InMemoryToken(),
    clientFactory: AxiosStatic = Axios
  ): Promise<AxiosInstance> {
    const client = clientFactory.create({
      baseURL: this.baseUrl
    })

    if (!persistence.hasToken()) {
      persistence.persist(await grant.retrieveAccessToken(client))
    }
    client.defaults.headers.common.Authorization = `Bearer ${persistence.restore()}`
    client.interceptors.response.use(null, forbiddenInterceptor(grant, client))
    return client
  }
}
