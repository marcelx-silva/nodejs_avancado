import { FacebookAccount } from "@/domain/models"
import { deepEqual } from "assert"


describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookId: 'any_fb_id'
  }
  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
  })

  it('should not update account name if it is already defined', () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
   })

    it('should update account name if it is not defined', () => {
      const accountData = { id: 'any_id' }
      const sut = new FacebookAccount(fbData ,accountData)

      expect(sut).toEqual({
        id: 'any_id',
        name: 'any_fb_name',
        email: 'any_fb_email',
        facebookId: 'any_fb_id'
      })
    })
})