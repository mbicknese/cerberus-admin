import ClientGrant from '../../../HttpAgent/GrantStrategies/ClientGrant'

describe('ClientGrant', () => {
  it('Uses given credentials to retrieve access token', async () => {
    const client = {post: jest.fn(() => Promise.resolve({ data: { access_token: 'RandomAccessToken' } }))}
    const strategy = new ClientGrant()
    strategy.setCredentials('foo', 'bar')

    const token = await strategy.retrieveAccessToken(client)

    expect(client.post).toHaveBeenCalled()
    expect(client.post.mock.calls[0][1]).toEqual({
      'grant_type': 'client_credentials',
      'client_id': 'foo',
      'client_secret': 'bar',
      'scope': ''
    })
    expect(token).toBe('RandomAccessToken')
  })
})
