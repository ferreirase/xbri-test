import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppService as UserService } from '../app.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.findoneByEMail(email);

    if (!user) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    return { token: this.signToken(user) };
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    try {
      const user = await this.userService.findoneByEMail(payload.sub);

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
    const user = await this.userService.findoneByEMail(email);

    if (!user) throw new HttpException('User not found', 404);

    if (!user.checkPassword(password))
      throw new HttpException('Invalid password', 401);

    return { id: user.id, email: user.email };
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
