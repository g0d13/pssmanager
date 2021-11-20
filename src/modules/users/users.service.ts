import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userDocument: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userDocument.find({});
  }

  async findById(id: Schema.Types.ObjectId): Promise<User> {
    return this.userDocument.findById(id).exec();
  }

  async create(userInput: CreateUserInput) {
    const user = await this.userDocument.create(userInput);
    await user.save();
    return user;
  }

  async update(id: string, userInput: UpdateUserInput): Promise<User> {
    return this.userDocument.findByIdAndUpdate(id, userInput, {
      new: true,
    });
  }
}
