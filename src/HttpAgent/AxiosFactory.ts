import Axios, { AxiosStatic, AxiosInstance } from 'axios'
import GrantStrategy from './GrantStrategies/GrantStrategy'
import ServerConfig from './ServerConfig'

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
  baseUrl: string
  clientFactory

  constructor (server: Partial<ServerConfig> = {}) {
    const { protocol, host, port, path } = {...defaultServer, ...server}
    this.baseUrl = `${protocol}://${host}:${port}${path}`
  }

  async createAgent (grant: GrantStrategy, clientFactory: AxiosStatic = Axios): Promise<AxiosInstance> {
    const client = clientFactory.create({
      baseURL: this.baseUrl
    })
    // TODO: Check for existing token
    const token = await grant.retrieveAccessToken(client)
    client.defaults.headers.common.Authorization = `Bearer ${token}`
    return client
  }
}
