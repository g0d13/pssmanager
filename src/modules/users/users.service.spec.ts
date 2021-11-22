import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMemoryMongodConnection,
  MongooseTestModule,
} from '../../common/test/MongoseeTestModule';
import { Group, GroupSchema } from '../groups/schema/group.schema';
import { CreateUserInput } from './dto/user.input';
import { User, UserDocument, UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

const userMock: CreateUserInput = {
  email: 'test@mail.com',
  name: 'name',
  password: 'password',
};

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseTestModule(),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Group.name, schema: GroupSchema },
        ]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>('UserModel');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect create a new user', async () => {
    const newUser = await service.create(userMock);
    expect(newUser).toBeDefined();
  });

  it('should update and return user updated', async () => {
    const newMail = 'newmail@mail.com';
    const newUser = await userModel.create(userMock);
    const updatedUser = await service.update(newUser._id, {
      email: newMail,
    });
    expect(updatedUser.email).toBe(newMail);
  });

  it('should return all users', async () => {
    await userModel.create(userMock);
    const users = await service.findAll();
    expect(users.length).not.toBe(0);
  });

  it('should find user using id', async () => {
    const newUser = await userModel.create(userMock);
    const findUser = service.findById(newUser._id);
    expect((await findUser)._id).toBe((await findUser)._id);
  });

  afterAll(async () => {
    await closeInMemoryMongodConnection();
  });
});
