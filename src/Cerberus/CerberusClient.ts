class CerberusClient {
  private api

  public constructor (api) {
    this.api = api
  }

  // TODO convert response to client entities
  public async getClients () {
    const api = await this.api
    const response = await api.get('/api/client')
    return response.data.data
  }
}

export default CerberusClient
