import { AxiosInstance } from 'axios'

export interface GrantStrategy {
  retrieveAccessToken(client: AxiosInstance): Promise<String>;
}
