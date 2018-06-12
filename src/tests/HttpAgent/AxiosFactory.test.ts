import { AxiosInstance } from 'axios'
import AxiosFactory from '../../HttpAgent/AxiosFactory'
import GrantStrategy from '../../HttpAgent/GrantStrategies/GrantStrategy'

describe('AxiosFactory', () => {
  it('returns sane defaults', async (done) => {
    const factory = new AxiosFactory()
    const mockGrant: GrantStrategy = { retrieveAccessToken: async (client: AxiosInstance) => 'SecureToken' }
    const agent = await factory.createAgent(mockGrant)

    expect(agent.defaults.headers.common.Authorization).toMatch(/Bearer [ -~]+/)
    expect(agent.defaults.baseURL).toBe('http://localhost:80/')

    done()
  })
})
