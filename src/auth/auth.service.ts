import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthUseCasesInterface } from '../libs/auth';
import { User, UserProfile } from '../libs/auth/domain/entities';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthUseCases')
    private readonly authUseCases: AuthUseCasesInterface,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<User> {
    const user = await this.authUseCases.findByEmail({ email: data.email });

    if (user) {
      throw new UnauthorizedException(
        `Already exists an user with this e-mail: ${data.email}`,
      );
    }

    if (!Object.keys(UserProfile).includes(data.profile))
      throw new UnauthorizedException('Invalid profile');

    return await this.authUseCases.createUser(data);
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.authUseCases.findByEmail({ email });

    if (!user) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    if (!user.validatePassword(password)) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    return { token: this.signToken(user) };
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    try {
      const user = await this.authUseCases.findByEmail({
        email: payload.sub,
      });

      if (!user) {
        throw new UnauthorizedException(
          `There isn't any user with email: ${payload.sub}`,
        );
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
  }

  async validateUser({ email, password }) {
    const user = await this.authUseCases.findByEmail({ email });

    if (!user) throw new HttpException('User not found', 404);

    if (!user.validatePassword(password))
      throw new HttpException('Invalid password', 401);

    return { id: user.id, email: user.email };
  }

  signToken(user: User): string {
    return this.jwtService.sign({
      sub: user.email,
    });
  }
}
