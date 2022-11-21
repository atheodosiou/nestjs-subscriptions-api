import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { sign, verify } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(email: string, pass: string): Promise<UserDocument> {
    if (!email && !pass) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    try {
      const hashedPassword = await hash(pass, 10);
      return await this.userService.createUser(email, hashedPassword);
    } catch (e) {
      console.error('REGISTER ERROR: ', e?.message ? e.message : e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const isOk = await compare(password, user.password);

      if (!isOk) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const accessToken = sign(
        { userId: user._id },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      );

      return { accessToken };
    } catch (e) {
      console.error('Login Error: ', e);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
