import {AuthenticationError} from "@/domain/errors/authentication";
import {FacebookAuthenticationService} from "@/data/services";
import {mock, MockProxy} from "jest-mock-extended";
import {LoadFacebookUserAPI} from "@/data/contracts/apis";

type SutTypes = {
    sut: FacebookAuthenticationService,
    loadFacebookUser: MockProxy<LoadFacebookUserAPI>
}
const makeSut = (): SutTypes => {
    const loadFacebookUser = mock<LoadFacebookUserAPI>()
    const sut = new FacebookAuthenticationService(loadFacebookUser)
    return { sut, loadFacebookUser }
}

describe("FacebookAuthenticationUseCase", () =>{
    let loadFacebookApi2: MockProxy<LoadFacebookUserAPI>
    let sut2: FacebookAuthenticationService

    beforeEach(()=> {
        loadFacebookApi2 = mock()
        sut2 = new FacebookAuthenticationService(loadFacebookApi2)
    })

    it('should call user facebook api with correct params', async function () {
        await sut2.perform({ token:'any_token' })
        expect(loadFacebookApi2.loadUserByToken).toHaveBeenCalledWith({ token: 'any_token'})
        expect(loadFacebookApi2.loadUserByToken).toHaveBeenCalledTimes(1)
    });

    it('should return authentication error when loadfacebookapi returns undefined', async function () {
        const {sut, loadFacebookUser} = makeSut()
        loadFacebookUser.loadUserByToken.mockResolvedValueOnce(undefined)
        const authResult = await sut.perform({ token: 'any_token' })

        expect(authResult).toEqual(new AuthenticationError())
    });
})