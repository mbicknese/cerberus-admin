import LocalStorage from '../../../HttpAgent/PersistenceStrategies/LocalStorage'

describe('LocalStorage', () => {
  const localStorage = new LocalStorage()

  it('persists and restores a token', () => {
    expect(localStorage.hasToken()).toBe(false)
    localStorage.persist('foo')
    expect(localStorage.hasToken()).toBe(true)
    expect(localStorage.restore()).toBe('foo')
  })
})
