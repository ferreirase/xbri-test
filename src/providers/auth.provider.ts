import { SignUpUseCase } from '../libs/auth/application';
import { UserAuthRepository } from '../libs/auth/application/repositories';

export const AuthProvider = {
  provide: 'AuthUseCases',
  useFactory: (signUpRepository: UserAuthRepository) => {
    return new SignUpUseCase(signUpRepository);
  },
  inject: ['UserTypeOrmRepository'],
};
