export default interface PersistenceStrategy {
  /**
   * Checks whether there is an access token persisted
   */
  hasToken (): boolean

  /**
   * Determines if the strategy is supported on current platform
   */
  isSupported (): boolean

  /**
   * Perists a new access token
   * @param token a new access token
   */
  persist (token: string): void

  /**
   * Retrieves the access token
   * @throws Error when there is no token to restore
   */
  restore (): string
}
