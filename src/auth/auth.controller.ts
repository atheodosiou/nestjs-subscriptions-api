import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: any) {
    return await this.authService.register(body.email, body.password);
  }

  @Post('/login')
  async login(@Body() body: any) {
    return await this.authService.login(body.email, body.password);
  }
}
