import PersistencePool from '../../../HttpAgent/PersistenceStrategies/PersistencePool'

describe('PersistencePool', () => {
  const persistencePool = new PersistencePool()

  it('throws an error without strategies', () => {
    expect(() => persistencePool.restore()).toThrow()
  })

  it('drops data without strategies', () => {
    expect(persistencePool.hasToken()).toBe(false)
    persistencePool.persist('foo')
    expect(persistencePool.hasToken()).toBe(false)
  })

  it('uses strategies in order', () => {
    const strat1 = { hasToken: () => false, isSupported: jest.fn(() => false), persist: () => {}, restore: () => '' }
    const strat2 = { hasToken: () => false, isSupported: jest.fn(() => true), persist: () => {}, restore: () => 'foo' }
    const strat3 = { hasToken: () => false, isSupported: jest.fn(() => true), persist: () => {}, restore: () => 'bar' }
    persistencePool.addStrategy(strat1)
    persistencePool.addStrategy(strat2)
    persistencePool.addStrategy(strat3)

    expect(persistencePool.restore()).toBe('foo')
    expect(strat1.isSupported.mock.calls.length).toBeGreaterThan(0)
    expect(strat3.isSupported.mock.calls.length).toBe(0)
  })
})
