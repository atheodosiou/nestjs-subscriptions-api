import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRpository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    return this.userModel.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    return this.userModel.find(filterQuery);
  }

  async create(user: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<UserDocument>,
    update: Partial<User>,
  ): Promise<any> {
    return this.userModel.findOneAndUpdate(filterQuery, update, { new: true });
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return this.userModel.findOneAndDelete(filterQuery);
  }
}
