import { TokenGenerator } from '@/data/contracts/crypto/TokenGenerator'
import sign from 'jsonwebtoken'

export class JwtTokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken(params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expires_in_ms / 1000
    const token = sign.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
    return token
  }
}
