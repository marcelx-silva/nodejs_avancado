import { TokenGenerator } from '@/data/contracts/crypto/TokenGenerator'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

export class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken(params: TokenGenerator.Params): Promise<void> {
    const expirationInSeconds = params.expires_in_ms / 1000
    jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

describe('JwtTokenGenerator', () =>{
  it('should call sign with correct params', async () => {
    const fakeJwt = jwt as jest.Mocked<typeof jwt>
    const sut = new JwtTokenGenerator('any_secret')
    
    await sut.generateToken({ key: 'any_key', expires_in_ms: 1000 })
    expect(fakeJwt.sign).toHaveBeenCalledWith({key: 'any_key'},  'any_secret', { expiresIn: 1} )
  })
})