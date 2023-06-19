import { TokenGenerator } from '@/data/contracts/crypto/TokenGenerator'
import jwt from 'jsonwebtoken'
import { before } from 'node:test'

jest.mock('jsonwebtoken')

export class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken(params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expires_in_ms / 1000
    const token = jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
    return token
  }
}

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
    await sut.generateToken({ key: 'any_key', expires_in_ms: 1000 })

    expect(fakeJwt.sign).toHaveBeenCalledWith({key: 'any_key'},  'any_secret', { expiresIn: 1} )
  })

  it('should return a token', async ()=>{
    const token = await sut.generateToken({ key: 'any', expires_in_ms: 1000 })
    expect(token).toBe('any_token')
  })
})