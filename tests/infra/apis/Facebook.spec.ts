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
    httpClient.get
      .mockResolvedValueOnce({ access_token: 'any_app_token' })
      .mockResolvedValueOnce({ data: { user_id: 'any_user_id' } })
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

 it('should get debug token', async() => {
  await sut
    .loadUserByToken({ token: 'any_client_token'})
  expect(httpClient.get)
    .toHaveBeenCalledWith({ 
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: 'any_app_token',
        input_token: 'any_client_token'
      }
    })  
})  

 it('should get debug token', async() => {
  await sut
    .loadUserByToken({ token: 'any_client_token'})
  expect(httpClient.get)
    .toHaveBeenCalledWith({ 
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: 'any_app_token',
        input_token: 'any_client_token'
      }
    })    
})

it('should get user info', async() => {
  await sut
    .loadUserByToken({ token: 'any_client_token'})
  expect(httpClient.get)
    .toHaveBeenCalledWith({ 
      url: 'https://graph.facebook.com/any_user_id',
      params: {
        fields: 'id,name,email',
        access_token: 'any_client_token'
      }
    })    
})

})