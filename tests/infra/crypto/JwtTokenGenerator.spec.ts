import { JwtTokenGenerator } from '@/infra/crypto/JwtTokenGenerator'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenGenerator', () =>{
  
  let sut: JwtTokenGenerator
  let fakeJwt: jest.Mocked<typeof jwt>
   
  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => 'any_token')
  })
   
  beforeEach(() => {
    sut = new JwtTokenGenerator('any_secret')
  })

  it('should call sign with correct params', async () => {   
    await sut.generate({ key: 'any_key', expires_in_ms: 1000 })

    expect(fakeJwt.sign).toHaveBeenCalledWith({key: 'any_key'},  'any_secret', { expiresIn: 1} )
  })

  it('should return a token', async ()=>{
    const token = await sut.generate({ key: 'any_key', expires_in_ms: 1000 })
    expect(token).toBe('any_token')
  })

  it('should rethrow if sign throws', async () => {
    fakeJwt.sign.mockImplementationOnce(() => { throw new Error('jwt_error') })
    const promise = sut.generate({ key: 'any_key', expires_in_ms: 1000 })
    expect(promise).rejects.toThrow(new Error('jwt_error'))
  })
})