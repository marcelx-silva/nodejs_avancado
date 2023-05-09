import {AuthenticationError} from "@/domain/errors/authentication";
import {FacebookAuthenticationService} from "@/data/services";

describe("FacebookAuthenticationUseCase", () =>{
    it('should call user facebook api with correct params', async function () {
        const loadFacebookUser = {
            loadUserByToken: jest.fn()
        }
        const sut = new FacebookAuthenticationService(loadFacebookUser)
        await sut.perform({ token: 'any_token' })

        expect(loadFacebookUser.loadUserByToken).toHaveBeenCalledWith({ token: 'any_token'})
        expect(loadFacebookUser.loadUserByToken).toHaveBeenCalledTimes(1)
    });

    it('should return authentication error when loadfacebookapi returns undefined', async function () {
        const loadFacebookUser = {
            loadUserByToken: jest.fn()
        }
        loadFacebookUser.loadUserByToken.mockResolvedValueOnce(undefined)
        const sut = new FacebookAuthenticationService(loadFacebookUser)
        const authResult = await sut.perform({ token: 'any_token' })

        expect(authResult).toEqual(new AuthenticationError())
    });
})