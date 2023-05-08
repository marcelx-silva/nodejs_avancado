import {FacebookAuthentication} from "@/domain/features";

class FacebookAuthenticationService {
    constructor(
        private readonly LoadFacebookUserAPI: LoadFacebookUserAPI
    ) {
    }
    async perform ( params: FacebookAuthentication.Params): Promise<void> {
        await this.LoadFacebookUserAPI.loadUserByToken(params)
    }
}

interface LoadFacebookUserAPI {
    loadUserByToken: ( params: LoadFacebookUserByTokenAPI.Params ) => Promise<void>
}

namespace LoadFacebookUserByTokenAPI {
    export type Params = {
        token: string;
    }
}

class LoadFacebookUserAPISpy implements LoadFacebookUserAPI {
    token?:string
    async loadUserByToken(params: LoadFacebookUserByTokenAPI.Params): Promise<void> {
        this.token = params.token
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
})