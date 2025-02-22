import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: { email: string; password: string }) {
    return await this.authService.login(
      createUserDto.email,
      createUserDto.password,
    );
  }
}
