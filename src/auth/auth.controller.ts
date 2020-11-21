import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './auth.dto';
import { Auth } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/new/user')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Auth> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<Auth> {
    return await this.authService.login(loginDto);
  }
}
