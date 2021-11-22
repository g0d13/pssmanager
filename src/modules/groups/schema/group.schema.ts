import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../../modules/users/schema/user.schema';
import { Schema as MongooseSchema } from 'mongoose';
import { Account } from '../../accounts/schema/account.schema';
import { Field, ObjectType } from '@nestjs/graphql';

export type GroupDocument = Group & Document;

@Schema()
@ObjectType()
export class Group {
  @Prop()
  @Field()
  name: string;

  @Prop({ ref: User.name, type: [MongooseSchema.Types.ObjectId] })
  @Field(() => [User])
  users: User[];

  @Prop({ ref: Account.name, type: [MongooseSchema.Types.ObjectId] })
  accounts: Account[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
