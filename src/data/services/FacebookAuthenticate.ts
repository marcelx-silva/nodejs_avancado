import { type FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors/authentication'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { AccessToken, FacebookAccount } from '@/domain/models'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repository/UserAccount'
import { TokenGenerator } from '../contracts/crypto/TokenGenerator'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserAPI: LoadFacebookUserAPI,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) {
  }

  async perform (params: FacebookAuthentication.Params): Promise<FacebookAuthentication.Result> {
    const fbData = await this.loadFacebookUserAPI.loadUserByToken(params)
    if (fbData !== undefined) { 
      const accountData = await this.userAccountRepository.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await this.userAccountRepository.saveWithFacebook(fbAccount)
      const tokenId = await this.crypto.generate({ key: id, expires_in_ms: AccessToken.expirationInMilliseconds })
      return new AccessToken(tokenId)
     }
    return new AuthenticationError()
  }
}
