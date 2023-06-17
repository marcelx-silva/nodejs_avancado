import { LoadFacebookUserAPI } from "@/data/contracts/apis"
import { HttpGetClient } from "@/infra/http/Client"

export class FacebookAPI {
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