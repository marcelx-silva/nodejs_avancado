import {AuthenticationError} from "@/domain/errors/authentication";
import {LoadFacebookUserAPI} from "@/data/contracts/apis";
import {FacebookAuthenticationService} from "@/data/services";

class LoadFacebookUserAPISpy implements LoadFacebookUserAPI {
    token?:string
    result = undefined
    callsCount: number = 0
    async loadUserByToken(params: LoadFacebookUserAPI.Params): Promise<LoadFacebookUserAPI.Result> {
        this.token = params.token
        this.callsCount++
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
        expect(loadFacebookUser.callsCount).toBe(1)
    });

    it('should return authentication error when loadfacebookapi returns undefined', async function () {
        const loadFacebookUser = new LoadFacebookUserAPISpy();
        loadFacebookUser.result = undefined
        const sut = new FacebookAuthenticationService(loadFacebookUser)
        const authResult = await sut.perform({ token: 'any_token' })

        expect(authResult).toEqual(new AuthenticationError())
    });
})