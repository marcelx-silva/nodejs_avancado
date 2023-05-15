import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'
import { any, mock, type MockProxy } from 'jest-mock-extended'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { type LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/apis/repository/UserAccount'

interface SutTypes {
  sut: FacebookAuthenticationService
  loadFacebookUser: MockProxy<LoadFacebookUserAPI>
}
describe('FacebookAuthenticationUseCase', () => {
  let loadFacebookApi2: MockProxy<LoadFacebookUserAPI>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let sut2: FacebookAuthenticationService

  beforeEach(() => {
    loadFacebookApi2 = mock()
    loadFacebookApi2.loadUserByToken.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      facebookId: 'any_id'
    })
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    sut2 = new FacebookAuthenticationService(loadFacebookApi2, userAccountRepo)
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
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should call createUserAccountRepository when LoadUserAccountRepo returns undefined', async function () {
    await sut2.perform({ token: 'any_token' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ email: 'any_email', name: 'any_name', facebookId: 'any_id' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should call UpdateFacebookAccountRepository when LoadUserAccount returns data', async function () {
    userAccountRepo.load.mockResolvedValueOnce({ name: 'any_name', id: 'any_id'})
    
    await sut2.perform({ token: 'any_token' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ id: 'any_id', name: 'any_name', facebookId: 'any_id', email: 'any_email' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should updates user\'s name when when LoadUserAccount returns an user account without name', async function () {
    userAccountRepo.load.mockResolvedValueOnce({ id: 'any_id'})
    
    await sut2.perform({ token: 'any_token' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ id: 'any_id', name: 'any_name', facebookId: 'any_id', email: 'any_email' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })
})

