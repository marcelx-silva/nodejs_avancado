import { type FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors/authentication'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { CreateFacebookAccountRepository, UpdateFacebookRepoistory, type LoadUserAccountRepository } from '@/data/contracts/apis/repository/UserAccount'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserAPI: LoadFacebookUserAPI,
    private readonly userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookRepoistory
  ) {
  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const data = await this.loadFacebookUserAPI.loadUserByToken(params)
    if (data !== undefined) { 
      const accountData = await this.userAccountRepository.load({ email: data.email })
      if(accountData !== undefined){
        await this.userAccountRepository.updateWithFacebook({
          name: accountData.name ?? data.name,
          id: accountData.id,
          facebookId: data.facebookId
        })
      }
      await this.userAccountRepository.createFromFacebook(data)
     }
    return new AuthenticationError()
  }
}
