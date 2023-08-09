import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // return await this.userModel.create(createUserDto);
    const isExists = await this.userModel
      .findOne({
        email: createUserDto.email,
        name: createUserDto.name,
      })
      .lean();

    if (isExists) {
      return null;
    } else {
      return this.userModel.create(createUserDto);
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  async findOneAndUpdate(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // return `This action updates a #${id} user`;
    updateUserDto['updatedAt'] = Date.now().toString();

    return this.userModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateUserDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
