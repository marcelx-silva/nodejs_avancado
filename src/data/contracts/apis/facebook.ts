export interface LoadFacebookUserAPI {
  loadUserByToken: (params: LoadFacebookUserAPI.Params) => Promise<LoadFacebookUserAPI.Result>
}

export namespace LoadFacebookUserAPI {
  export interface Params {
    token: string
  }
  export type Result = undefined | UserData

  export interface UserData {
    name: string
    email: string
    facebookId: string

  }
}
