import { GrantStrategy } from './GrantStrategy'
import { AxiosInstance } from 'axios'

class ClientStrategy implements GrantStrategy {
  id: String
  secret: String

  setCredentials (id: String, secret: String): void {
    this.id = id
    this.secret = secret
  }

  async retrieveAccessToken (client: AxiosInstance): Promise<String> {
    const response = await client.post('access-token', {
      'grant_type': 'client_credentials',
      'client_id': this.id,
      'client_secret': this.secret,
      'scope': ''
    })
    return response.data.access_token
  }
}

export default ClientStrategy
