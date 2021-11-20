import { Query } from '@nestjs/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async create(@Args('input') userInput: CreateUserInput): Promise<User> {
    return this.userService.create(userInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(
    @Args('_id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('id') id: string,
    @Args('input') userInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.update(id, userInput);
    return user;
  }

  @Query(() => String)
  ping(): string {
    return 'pong';
  }
}
