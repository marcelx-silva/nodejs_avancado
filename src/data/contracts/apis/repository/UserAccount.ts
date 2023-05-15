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

export interface CreateFacebookAccountRepository {
   createFromFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<void>
}

export namespace CreateFacebookAccountRepository {
  export type Params = {
    name: string,
    email: string,
    facebookId: string
  }
}

export interface UpdateFacebookRepoistory {
  updateWithFacebook: (params: UpdateFacebookRepoistory.Params) => Promise<void>
}

export namespace UpdateFacebookRepoistory {
  export type Params = {
    facebookId: string,
    name: string,
    id: string
  }
}
