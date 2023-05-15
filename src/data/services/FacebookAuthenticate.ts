import { type FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors/authentication'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { type LoadUserAccountRepository } from '@/data/contracts/apis/repository/UserAccount'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserAPI: LoadFacebookUserAPI,
    private readonly loadUserAccountRepository: LoadUserAccountRepository
  ) {
  }

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const data = await this.loadFacebookUserAPI.loadUserByToken(params)
    if (data !== undefined) { await this.loadUserAccountRepository.load({ email: data.email }) }
    return new AuthenticationError()
  }
}
