import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseTestModule } from '../../common/test/MongoseeTestModule';
import { User, UserSchema } from './schema/user.schema';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userService: jest.Mocked<UsersService>;

  const usersServiceMock: Partial<UsersService> = {
    create: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        UsersResolver,
      ],
    }).compile();

    userService = module.get(UsersService);
    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should service be defined', () => {
    expect(userService).toBeDefined();

    expect(resolver).toBeDefined();
  });

  it('should return pong', async () => {
    const resp = resolver.ping();
    expect(resp).toBe('pong');
  });
});
