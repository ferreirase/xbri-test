import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthProvider, UserTypeOrmRepositoryProvider } from '../providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/loca.strategy';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JWTAuthGuard,
    JwtStrategy,
    LocalStrategy,
    LocalAuthGuard,
    UserTypeOrmRepositoryProvider,
    AuthProvider,
    AuthService,
  ],
  exports: [JWTAuthGuard, LocalAuthGuard, AuthService],
})
export class AuthModule {}
