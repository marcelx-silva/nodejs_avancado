export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}
export namespace LoadUserAccountRepository {
  export interface Params {
    email: string
  }
  export type Result = undefined | {
    name?: string
    id: string
  }
}

export interface SaveFacebookAccountRepository {
   saveWithFacebook: (params: SaveFacebookAccountRepository.Params) => Promise<void>
}

export namespace SaveFacebookAccountRepository {
  export type Params = {
    id?: string
    name: string,
    email: string,
    facebookId: string
  }
}
