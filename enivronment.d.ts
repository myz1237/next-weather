/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_TOKEN: string;
    }
  }
}

export {};
