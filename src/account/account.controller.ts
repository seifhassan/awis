// account/account.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';
import { CreateAccountDto } from './account.dto';
import { validate } from 'class-validator';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const newAccount = new AccountEntity();
    newAccount.accountNumber = createAccountDto.accountNumber;
    newAccount.balance = createAccountDto.initialBalance;

    const errors = await validate(newAccount);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.accountService.createAccount(newAccount);
    } catch (error) {
      throw new HttpException('Failed to create account', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
