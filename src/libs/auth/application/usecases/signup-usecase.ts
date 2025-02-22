import { User, UserProfile } from '../../domain';
import {
  AuthUseCasesInterface,
  FindByEmail,
  SignUp,
} from '../../domain/usecases';
import { Email, Password } from '../../domain/value-objects';
import { UserAuthRepository } from '../repositories';

export class SignUpUseCase implements AuthUseCasesInterface {
  constructor(readonly repository: UserAuthRepository) {}

  async createUser(input: SignUp.Input): Promise<SignUp.Output> {
    try {
      const newUser = User.create(
        input.name,
        new Email(input.email),
        Password.create(input.password),
        UserProfile[input.profile as keyof typeof UserProfile],
      );

      return await this.repository.insert(newUser);
    } catch (error: any) {
      throw new error(`Error: ${error.message}`);
    }
  }

  async findByEmail(email: FindByEmail.Input): Promise<FindByEmail.Output> {
    const userFound = await this.repository.getByEmail({ email: email.email });

    return userFound ?? null;
  }
}
