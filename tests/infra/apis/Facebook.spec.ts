import { FacebookAPI } from "@/infra/apis/FacebookAPI"
import { HttpGetClient } from "@/infra/http/Client"
import { MockProxy, mock } from "jest-mock-extended"

describe('FacebookApi', () => {
  let client_id: string
  let client_secret: string
  let sut: FacebookAPI
  let httpClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    client_id = 'any_client_id'
    client_secret = 'any_client_secret'
    httpClient = mock()
  })

  beforeEach(() => {
    sut = new FacebookAPI(httpClient, client_id, client_secret)
  })

  it('should get app token', async() => {
    await sut
      .loadUserByToken({ token: 'any_client_token'})
    expect(httpClient.get)
      .toHaveBeenCalledWith({ 
        url: 'https://graph.facebook.com/oauth/access_token',
        params: {
          client_id: client_id,
          client_secret: client_secret,
          grant_type: 'any_grant_type'
        }
      })
  })
})