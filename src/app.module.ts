import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import typeOrmConfig from './typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, AccountModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
