export interface FacebookAuthentication {
    perform: (params: Params) => AccessToken | Error
}

type Params = {
    token: string
}

type AccessToken = {
    accessToken: string
}

class AuthenticationError extends Error{
    constructor() {
        super("Authentication Failed");
        this.name = "AuthenticationError"
    }
}