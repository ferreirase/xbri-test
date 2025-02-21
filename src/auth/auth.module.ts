import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../app.service';
import { User } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/loca.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'segredo',
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
