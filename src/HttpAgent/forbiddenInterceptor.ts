import GrantStrategy from './GrantStrategies/GrantStrategy'
import { AxiosInstance } from 'axios'

const forbiddenInterceptor = (grant: GrantStrategy, client: AxiosInstance) => async ({ response, config }) => {
  if (response.status === 403) {
    const token = grant.retrieveAccessToken(client)
    client.defaults.headers.common.Authorization = `Bearer ${token}`
    // return client.request(config)
  }
}

export default forbiddenInterceptor
