import { type FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors/authentication'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/data/contracts/apis/repository/UserAccount'
import { FacebookAccount } from '@/domain/models'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserAPI: LoadFacebookUserAPI,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {
  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserAPI.loadUserByToken(params)
    if (fbData !== undefined) { 
      const accountData = await this.userAccountRepository.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      await this.userAccountRepository.saveWithFacebook(fbAccount)
     }
    return new AuthenticationError()
  }
}
