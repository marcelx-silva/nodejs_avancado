import {FacebookAuthentication} from "@/domain/features";
import {AuthenticationError} from "@/domain/errors/authentication";

export class FacebookAuthenticationService {
    constructor(
        private readonly LoadFacebookUserAPI: LoadFacebookUserAPI
    ) {
    }
    async perform ( params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.LoadFacebookUserAPI.loadUserByToken(params)
        return new AuthenticationError()
    }
}