import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UserRpository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRpository) {}

  async getUserById(userId: string): Promise<UserDocument> {
    return this.userRepository.findOne({ _id: userId });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userRepository.findOne({ email });
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userRepository.find({});
  }

  async createUser(
    email: string,
    password: string,
    fullName?: string,
  ): Promise<UserDocument> {
    return this.userRepository.create({
      email,
      password,
      fullName,
    });
  }

  async updateUser(
    userId: any,
    userUpdates: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userRepository.findOneAndUpdate({ _id: userId }, userUpdates);
  }

  async removeUser(userId: string): Promise<UserDocument> {
    return this.userRepository.findOneAndDelete({ _id: userId });
  }
}
