import PersistenceStrategy from './PersistenceStrategy'

const key = 'http.access-token'

/**
 * Uses the browsers LocalStorage to store the access token
 */
export default class LocalStorage implements PersistenceStrategy {
  private token: string

  public hasToken (): boolean {
    this.token = localStorage.getItem(key)
    return this.token !== null
  }

  public isSupported (): boolean {
    try {
      if (localStorage === undefined) { return false }
      localStorage.setItem('59b2d3c0-0c6d-423f-a52b-4d27f4f547d0', '59b2d3c0-0c6d-423f-a52b-4d27f4f547d0')
      localStorage.removeItem('59b2d3c0-0c6d-423f-a52b-4d27f4f547d0')
      return true
    } catch (e) {
      return false
    }
  }

  public persist (token: string): void {
    this.token = token
    localStorage.setItem(key, token)
  }

  public restore (): string {
    if (this.token !== null || this.hasToken()) {
      return this.token
    }
    throw new Error('There is no access token to restore')
  }
}
