import { User } from '../entities';

export interface AuthUseCasesInterface {
  createUser(input: SignUp.Input): Promise<SignUp.Output>;
  findByEmail(email: FindByEmail.Input): Promise<FindByEmail.Output>;
}

export namespace FindByEmail {
  export type Input = { email: string };
  export type Output = User | null;
}

export namespace SignUp {
  export type Input = {
    name: string;
    email: string;
    password: string;
    profile: string;
  };
  export type Output = User;
}
