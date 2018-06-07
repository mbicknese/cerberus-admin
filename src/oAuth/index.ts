import { GrantStrategy } from './GrantStrategies/GrantStrategy'
// TODO abstract axios out of the system
import { AxiosStatic, AxiosInstance } from 'axios'

// Has access token?
// No -> fetch using given grantStrategy
// Yes -> fetch existing
// Build client with access token

export default async (grant: GrantStrategy, clientFactory: AxiosStatic): Promise<AxiosInstance> => {
  const client = clientFactory.create({
    baseURL: 'http://localhost:8080/' // TODO make configurable
  })
  // TODO: Check for existing token
  const token = await grant.retrieveAccessToken(client)
  client.defaults.headers.common.Authorization = `Bearer ${token}`
  return client
}
