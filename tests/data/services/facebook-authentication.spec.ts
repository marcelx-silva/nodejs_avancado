import {FacebookAuthentication} from "@/domain/features";
import {AuthenticationError} from "@/domain/errors/authentication";
import {LoadFacebookUserAPI} from "@/data/contracts/apis";

class FacebookAuthenticationService {
    constructor(
        private readonly LoadFacebookUserAPI: LoadFacebookUserAPI
    ) {
    }
    async perform ( params: FacebookAuthentication.Params): Promise<AuthenticationError> {
        await this.LoadFacebookUserAPI.loadUserByToken(params)
        return new AuthenticationError()
    }
}


class LoadFacebookUserAPISpy implements LoadFacebookUserAPI {
    token?:string
    result = undefined
    async loadUserByToken(params: LoadFacebookUserAPI.Params): Promise<LoadFacebookUserAPI.Result> {
        this.token = params.token
        return this.result;
    }
}

describe("FacebookAuthenticationUseCase", () =>{
    it('should call user facebook api with correct params', async function () {
        const loadFacebookUser = new LoadFacebookUserAPISpy();
        const sut = new FacebookAuthenticationService(loadFacebookUser)
        console.log(sut)
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUser.token).toBe('any_token')
    });

    it('should return authentication error when loadfacebookapi returns undefined', async function () {
        const loadFacebookUser = new LoadFacebookUserAPISpy();
        loadFacebookUser.result = undefined
        const sut = new FacebookAuthenticationService(loadFacebookUser)
        const authResult = await sut.perform({ token: 'any_token' })

        expect(authResult).toEqual(new AuthenticationError())
    });
})