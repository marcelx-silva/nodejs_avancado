export class AccessToken {
  constructor (private readonly value: string) {
    this.value = value
  }

  static get expirationInMilliseconds (): number {
    return 30 * 60 * 1000
  }
}
