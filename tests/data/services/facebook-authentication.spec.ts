import { AuthenticationError } from '@/domain/errors/authentication'
import { FacebookAuthenticationService } from '@/data/services'
import { any, mock, type MockProxy } from 'jest-mock-extended'
import { type LoadFacebookUserAPI } from '@/data/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repository/UserAccount'
import { FacebookAccount } from '@/domain/models/FacebookAccount'
import { TokenGenerator } from '@/data/contracts/crypto/TokenGenerator'
import { AccessToken } from '@/domain/models'

// Esta linha é necessária para que o jest entenda que 
//o arquivo que está sendo importado é um mock. 
jest.mock('@/domain/models/FacebookAccount')


interface SutTypes {
  sut: FacebookAuthenticationService
  loadFacebookUser: MockProxy<LoadFacebookUserAPI>
}


describe('FacebookAuthenticationUseCase', () => {
  let loadFacebookApi2: MockProxy<LoadFacebookUserAPI>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let sut2: FacebookAuthenticationService
  let crypto: MockProxy<TokenGenerator>

  beforeEach(() => {
    loadFacebookApi2 = mock()
    loadFacebookApi2.loadUserByToken.mockResolvedValueOnce({
      name: 'any_name',
      email: 'any_email',
      facebookId: 'any_id'
    })
    userAccountRepo = mock()
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })
    crypto = mock()
    sut2 = new FacebookAuthenticationService(loadFacebookApi2, userAccountRepo, crypto)
    
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

    const FacebookAccountStub = jest.fn()
    .mockImplementation(() => ({ name: 'any_name', facebookId: 'any_id', email: 'any_email' }))

    const FacebookAccountMock = jest
    .mocked(FacebookAccount)
    .mockImplementation(FacebookAccountStub)

    await sut2.perform({ token: 'any_token' })
    expect(userAccountRepo.saveWithFacebook)
    .toHaveBeenCalledWith({ email: 'any_email', name: 'any_name', facebookId: 'any_id' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should call UpdateFacebookAccountRepository when LoadUserAccount returns data', async function () {

    const FacebookAccountStub = jest.fn()
    .mockImplementation(() => ({ id: 'any_id', name: 'any_name', facebookId: 'any_id', email: 'any_email' }))

    const FacebookAccountMock = jest
    .mocked(FacebookAccount)
    .mockImplementation(FacebookAccountStub)

    userAccountRepo.load.mockResolvedValueOnce({ name: 'any_name', id: 'any_id'})
    
    await sut2.perform({ token: 'any_token' })
    expect(userAccountRepo.saveWithFacebook)
    .toHaveBeenCalledWith({ id: 'any_id', name: 'any_name', facebookId: 'any_id', email: 'any_email' })

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should call SaveFacebookAccountRepository with Facebook Account', async function () {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    const FacebookAccountMock = jest
    .mocked(FacebookAccount)
    .mockImplementation(FacebookAccountStub)

    userAccountRepo.load.mockResolvedValueOnce({ name: 'any_name', id: 'any_id'})
    
    await sut2.perform({ token: 'any_token' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({any: 'any'})
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should call TokenGenerator with correct params', async function () {
    
    await sut2.perform({ token: 'any_token' })
    expect(crypto.generate).toHaveBeenCalledWith({key: 'any_account_id', expires_in_ms: AccessToken.expirationInMilliseconds})
    expect(crypto.generate).toHaveBeenCalledTimes(1)
  })

})

