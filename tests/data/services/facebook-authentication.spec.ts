import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'
import { any, mock, type MockProxy } from 'jest-mock-extended'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { type LoadUserAccountRepository } from '@/data/contracts/apis/repository/UserAccount'

interface SutTypes {
  sut: FacebookAuthenticationService
  loadFacebookUser: MockProxy<LoadFacebookUserAPI>
}
describe('FacebookAuthenticationUseCase', () => {
  let loadFacebookApi2: MockProxy<LoadFacebookUserAPI>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>
  let sut2: FacebookAuthenticationService

  beforeEach(() => {
    loadFacebookApi2 = mock()
    loadFacebookApi2.loadUserByToken.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      facebookId: 'any_id'
    })
    loadUserAccountRepo = mock()
    sut2 = new FacebookAuthenticationService(loadFacebookApi2, loadUserAccountRepo)
  })

  it('should call user facebook api with correct params', async function () {
    await sut2.perform({ token: 'any_token' })
    expect(loadFacebookApi2.loadUserByToken).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookApi2.loadUserByToken).toHaveBeenCalledTimes(1)
  })

  it('should return authentication error when loadfacebookapi returns undefined', async function () {
    loadFacebookApi2.loadUserByToken.mockResolvedValueOnce(undefined)
    const authResult = await sut2.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should call LoadUserAccountRepository when LoadFacebookAPI returns data', async function () {
    await sut2.perform({ token: 'any_token' })
    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })
})

class LoadUserByEmail implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<void> {

  }
}
