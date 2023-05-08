export interface FacebookAuthentication {
    perform: (token: string) => AccessToken | Error
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