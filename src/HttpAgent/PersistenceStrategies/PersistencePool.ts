import PersistenceStrategy from './PersistenceStrategy'

/**
 * Uses a set of persistence strategies in order to ensure full compatibility with the platform
 */
export default class PersistencePool implements PersistenceStrategy {
  private strategies: Array<PersistenceStrategy>
  private currentStrategy: PersistenceStrategy

  constructor (...strategies: PersistenceStrategy[]) {
    this.strategies = strategies
    this.determineStrategy()
  }

  private determineStrategy (): void {
    for (let strategy of this.strategies) {
      if (strategy.isSupported()) {
        this.currentStrategy = strategy
        return
      }
    }
  }

  public addStrategy (strategy: PersistenceStrategy): void {
    if (!this.strategies.includes(strategy)) {
      this.strategies.push(strategy)
      this.determineStrategy()
    }
  }

  public hasToken (): boolean {
    return this.isSupported() && this.currentStrategy.hasToken()
  }

  public isSupported (): boolean {
    return this.currentStrategy !== undefined
  }

  public persist (token: string): void {
    this.isSupported() && this.currentStrategy.persist(token)
  }

  public restore (): string {
    if (!this.isSupported()) {
      throw new Error('No supported token persistence found, cannot restore.')
    }
    return this.currentStrategy.restore()
  }
}
