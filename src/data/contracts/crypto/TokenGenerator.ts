export interface TokenGenerator {
    generate: (params: TokenGenerator.Params) => Promise<void>
  }
  
  export namespace TokenGenerator {
    export type Params = {
      key: string
      expires_in_ms: number
    }
  }