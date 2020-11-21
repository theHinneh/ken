import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';
import { LoginDto, SignUpDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(AuthRepository) private authRepository: AuthRepository) {
  }

  async signUp(authDto: SignUpDto): Promise<Auth> {
    const user = new Auth();
    user.email = authDto.email;
    user.username = authDto.username;
    user.status = authDto.status
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(authDto.password, user.salt);
    const auth = await this.authRepository.signUp(user);
    delete auth.password;
    delete auth.salt;
    return auth;
  }

  async login(loginDto: LoginDto): Promise<Auth> {
    const { username, password } = loginDto;
    const user = await this.authRepository.findOne({ username });
    if (user && await bcrypt.hash(password, user.salt) === user.password) {
      delete user.password
      delete user.salt
      return user;
    } else throw new UnauthorizedException({ message: 'Username or Password is incorrect' });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
