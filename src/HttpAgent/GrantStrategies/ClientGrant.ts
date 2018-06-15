import GrantStrategy from './GrantStrategy'
import { AxiosInstance } from 'axios'

/**
 * Strategy to apply the client credentials grant
 *
 * Authenticating with client credentials mean you supply the application
 * with a pregenerated set of a key/id and a secret. These can be passed
 * to the auth server to retrieve an access token.
 */
export default class ClientGrant implements GrantStrategy {
  id: String
  secret: String

  constructor (id: String = '', secret: String = '') {
    this.setCredentials(id, secret)
  }

  setCredentials (id: String, secret: String) {
    this.id = id
    this.secret = secret
  }

  async retrieveAccessToken (client: AxiosInstance): Promise<string> {
    const response = await client.post('access-token', {
      'grant_type': 'client_credentials',
      'client_id': this.id,
      'client_secret': this.secret,
      'scope': ''
    })
    return response.data.access_token
  }
}
