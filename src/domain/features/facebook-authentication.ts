export interface FacebookAuthentication {
    perform: (token: string) => AccessToken | Error
}

type AccessToken = {
    accessToken: string
}