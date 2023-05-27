export type FacebookData = {
  id?: string
  name: string
  email: string
  facebookId: string
}

export type AccountData = {
  id?: string
  name?: string      
}
export class FacebookAccount {
  id?: string
  name: string
  email: string
  facebookId: string

  constructor (fbData: FacebookData, accountData?: AccountData) {
    this.id =   accountData?.id
    this.name = accountData?.name ?? fbData.name
    this.email = fbData.email
    this.facebookId =  fbData.facebookId  
  }
}