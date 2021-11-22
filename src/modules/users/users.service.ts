import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from '../groups/schema/group.schema';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User, UserDocument } from './schema/user.schema';
import { Schema } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userDocument: Model<UserDocument>,
    @InjectModel(Group.name)
    private readonly groupModel: Model<GroupDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userDocument.find({});
  }

  async findById(id: Schema.Types.ObjectId): Promise<User> {
    return this.userDocument.findById(id).exec();
  }

  async create(userInput: CreateUserInput) {
    const group = await this.groupModel.create({});
    const user = await this.userDocument.create(userInput);
    group.users.push(user);
    return user;
  }

  async update(id: string, userInput: UpdateUserInput): Promise<User> {
    return this.userDocument.findByIdAndUpdate(id, userInput, {
      new: true,
    });
  }
}
