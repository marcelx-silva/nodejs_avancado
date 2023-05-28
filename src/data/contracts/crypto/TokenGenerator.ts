export interface TokenGenerator {
    generate: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
  }
  
  export namespace TokenGenerator {
    export type Params = {
      key: string
      expires_in_ms: number
    }

    export type Result = string
  }