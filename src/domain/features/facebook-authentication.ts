export interface FacebookAuthentication {
    perform: (params: FacebookAuthentication.Params) => AccessToken | Error
}

namespace FacebookAuthentication {
    export type Params = {
        token: string
    }
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