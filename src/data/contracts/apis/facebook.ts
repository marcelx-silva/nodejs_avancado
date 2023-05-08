export interface LoadFacebookUserAPI {
    loadUserByToken: ( params: LoadFacebookUserAPI.Params ) => Promise<void>
}

export namespace LoadFacebookUserAPI {
    export type Params = {
        token: string;
    }
    export type Result = undefined
}