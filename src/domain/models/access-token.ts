export class AccessToken {
  //private expires_in_ms: number
  constructor (private readonly value: string) {
    this.value = value
    //this.expires_in_ms = AccessToken.expirationInMilliseconds
  }

  static get expirationInMilliseconds (): number {
    return 30 * 60 * 1000
  }
}
