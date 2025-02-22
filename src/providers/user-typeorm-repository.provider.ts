import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserSchema } from '../libs/auth/infra/db/typeorm/schemas';
import { UserTypeOrmRepository } from '../libs/auth/infra/repositories';

export const UserTypeOrmRepositoryProvider = {
  provide: 'UserTypeOrmRepository',
  useFactory: (dataSource: DataSource) => {
    return new UserTypeOrmRepository(dataSource.getRepository(UserSchema));
  },
  inject: [getDataSourceToken()],
};
