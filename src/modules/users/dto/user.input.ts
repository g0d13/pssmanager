import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsOptional()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
