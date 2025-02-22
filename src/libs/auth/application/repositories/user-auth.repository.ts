import { User } from '../../domain';

export interface UserAuthRepository {
  insert(input: CreateUserDTO.Input): Promise<CreateUserDTO.Output>;

  getByEmail(
    input: FindUserByEmailDTO.Input,
  ): Promise<FindUserByEmailDTO.Output>;
}

export namespace CreateUserDTO {
  export type Input = User;
  export type Output = User;
}

export namespace FindUserByEmailDTO {
  export type Input = {
    email: string;
  };
  export type Output = User | null;
}
