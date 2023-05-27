import { AccessToken } from "@/domain/models"

describe('AccessToken', () => {
    it('should create with a value', () => {
        const sut = new AccessToken('any_value')
        expect(sut).toEqual({value: 'any_value'})
    })

    it('should expire in 1800000 ms (30 min)', () => {
        expect(AccessToken.expirationInMilliseconds).toBe(1800000)
    })
})