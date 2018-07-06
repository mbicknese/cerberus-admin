import InMemoryToken from '../../../HttpAgent/PersistenceStrategies/InMemoryToken'

describe('InMemoryToken', () => {
  const inMemoryToken = new InMemoryToken()
  it('is always supported', () => {
    expect(inMemoryToken.isSupported()).toBe(true)
  })
  it('persists and restores a token', () => {
    expect(inMemoryToken.hasToken()).toBe(false)
    inMemoryToken.persist('foo')
    expect(inMemoryToken.hasToken()).toBe(true)
    expect(inMemoryToken.restore()).toBe('foo')
  })
})
