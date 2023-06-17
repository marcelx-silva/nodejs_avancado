import { LoadFacebookUserAPI } from "@/data/contracts/apis"
import { MockProxy, mock } from "jest-mock-extended"

class FacebookAPI {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor (
    private readonly httpClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ){}
  async loadUserByToken (token: LoadFacebookUserAPI.Params, ): Promise<void> {
    await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'any_grant_type'
      }
    })
    
  }
}
interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<void>
}

namespace HttpGetClient {
  export type Params = {
    url: string,
    params: {
      client_id: string,
      client_secret: string,
      grant_type: string
    }
  }
}

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