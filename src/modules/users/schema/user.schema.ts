import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type UserDocument = User & Document;

@Schema({})
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field({ nullable: true })
  name: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop()
  @Field({ nullable: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
