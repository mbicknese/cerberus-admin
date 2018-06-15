import PersistenceStrategy from './PersistenceStrategy'

/**
 * Keeps the access token in current runtime memory
 *
 * Note: the token is lost as soon as the process is terminated
 */
export default class InMemoryToken implements PersistenceStrategy {
  private token: string

  public hasToken (): boolean {
    return this.token !== undefined
  }

  public isSupported (): boolean {
    return true
  }

  public persist (token: string): void {
    this.token = token
  }

  public restore (): string {
    return this.token
  }
}
