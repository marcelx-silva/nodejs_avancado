import { HttpGetClient } from "@/infra/http/Client"
import axios from 'axios'

jest.mock('axios')

export class AxiosHttpClient {
  async get (params: HttpGetClient.Params): Promise<void> {
    return axios.get(params.url, { params: params.params })
  }
}
describe('AxiosHttpClient', () => {
  describe('get', () => {
    it('should call get with correct params', async () => {
      const sut = new AxiosHttpClient()
      const fakeAxios = axios as jest.Mocked<typeof axios>
      await sut.get({
        url: 'any_url',
        params: {
          any_param: 'any_value'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', { params: { any_param: 'any_value' }}) 
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})