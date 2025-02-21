import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.appService.createUser(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: { email: string; password: string }) {
    return await this.authService.login(
      createUserDto.email,
      createUserDto.password,
    );
  }
}
