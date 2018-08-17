class CerberusClient {
  private api

  public constructor (api) {
    this.api = api
  }

  // TODO convert response to client entities
  public async getClients () {
    const api = await this.api
    return api.get('/api/client')
  }
}

export default CerberusClient
