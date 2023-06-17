import axios from "axios"
import { HttpGetClient } from "./Client"

export class AxiosHttpClient {
  async get (params: HttpGetClient.Params): Promise<any> {
   const result = await axios.get(params.url, { params: params.params })
    return result.data
  }
}