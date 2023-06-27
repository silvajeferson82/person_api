
export class UserEntity implements IUser {
  constructor({
    id,
    name,
    email,
    cpf,
    password,
    password_confirmation,
    role,
    createdAt,
    updatedAt,
  }: IUser) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  id: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  password_confirmation?: string;
  role: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
