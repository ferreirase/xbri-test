import { Repository } from 'typeorm';
import {
  CreateUserDTO,
  FindUserByEmailDTO,
  UserAuthRepository,
} from '../../../application/repositories';
import { User } from '../../../domain/entities';
import { Email } from '../../../domain/value-objects';

export class UserTypeOrmRepository implements UserAuthRepository {
  constructor(private repository: Repository<User>) {}

  async insert(input: CreateUserDTO.Input): Promise<CreateUserDTO.Output> {
    return await this.repository.save(input);
  }

  async getByEmail(
    input: FindUserByEmailDTO.Input,
  ): Promise<FindUserByEmailDTO.Output> {
    const found = await this.repository.findOne({
      where: {
        email: new Email(input.email),
      },
    });

    if (found) {
      return User.buildExistingUser(
        found.name,
        found.email.getValue(),
        found.profile,
        found.password.getValue(),
        found.password.getSalt(),
        found.id,
      );
    }

    return null;
  }
}
