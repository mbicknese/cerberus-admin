import { AxiosInstance } from 'axios'

export default interface GrantStrategy {
  retrieveAccessToken(client: AxiosInstance): Promise<String>
}
