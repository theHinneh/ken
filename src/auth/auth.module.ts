import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: process.env.JWT_EXPIRY } }),
  ],
  exports: [PassportModule],
})
export class AuthModule {
}
