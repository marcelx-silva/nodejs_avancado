export interface FacebookAuthentication {
    perform: (token: string) => string | Error
}

