import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { GroupsService } from './modules/groups/groups.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/pssmanager'),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule,
    AccountsModule,
  ],
  providers: [GroupsService],
})
export class AppModule {}
