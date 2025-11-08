// src/types/crypto-js.d.ts
import CryptoJS from 'crypto-js'

declare module 'crypto-js' {
  export namespace mode {
    export const GCM: Mode
  }
  export interface CipherParams {
    authTag: WordArray
  }
}
