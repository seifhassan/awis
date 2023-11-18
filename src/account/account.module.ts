
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TransactionModule } from '../transaction/transaction.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), TransactionModule], 
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
