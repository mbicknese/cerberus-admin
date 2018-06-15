import { AxiosInstance } from 'axios'
import AxiosFactory from '../../HttpAgent/AxiosFactory'
import GrantStrategy from '../../HttpAgent/GrantStrategies/GrantStrategy'
import PersistenceStrategy from '../../HttpAgent/PersistenceStrategies/PersistenceStrategy'

describe('AxiosFactory', () => {
  it('returns sane defaults', async (done) => {
    const factory = new AxiosFactory()
    const mockGrant: GrantStrategy = {
      retrieveAccessToken: async (client: AxiosInstance) => 'SecureToken',
      handleForbidden: (_) => {}
    }
    const mockPersistence: PersistenceStrategy = {
      hasToken (): boolean { return false },
      isSupported (): boolean { return true },
      persist (token: string): void { this.token = token },
      restore (): string { return this.token }
    }
    const agent = await factory.createAgent(mockGrant, mockPersistence)

    expect(agent.defaults.headers.common.Authorization).toMatch(/Bearer [ -~]+/)
    expect(agent.defaults.baseURL).toBe('http://localhost:80/')

    done()
  })
})
