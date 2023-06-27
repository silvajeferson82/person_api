declare namespace NodeJS {
  interface ProcessEnv {
    PORT: int;
  }
}

declare interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  password_confirmation?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface IRequestUser {
  name: string;
  email: string;
  cpf: string;
  password: string;
  password_confirmation?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface HTTPResponseObject {
  withError?: boolean
  data?: object
  status?: number
  error?: string
}

declare interface HTTPRequestObject {
  id: string
  user: IRequestUser
}