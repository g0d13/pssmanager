import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, AccountsModule],
})
export class AppModule {}
