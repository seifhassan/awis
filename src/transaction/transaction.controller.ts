// transaction/transaction.controller.ts
import { Controller, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto, TransferDto } from './transaction.dto';
import { validate } from 'class-validator';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit/:accountId')
  async deposit(@Param('accountId') accountId: number, @Body() transactionDto: TransactionDto) {
    const depositTransaction = new TransactionDto();
    depositTransaction.type = 'deposit';
    depositTransaction.amount = transactionDto.amount;

    const errors = await validate(depositTransaction);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.transactionService.deposit(accountId, depositTransaction.amount);
    } catch (error) {
      throw new HttpException('Failed to process deposit transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('withdraw/:accountId')
  async withdraw(@Param('accountId') accountId: number, @Body() transactionDto: TransactionDto) {
    const withdrawalTransaction = new TransactionDto();
    withdrawalTransaction.type = 'withdrawal';
    withdrawalTransaction.amount = transactionDto.amount;

    const errors = await validate(withdrawalTransaction);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.transactionService.withdraw(accountId, withdrawalTransaction.amount);
    } catch (error) {
      throw new HttpException('Failed to process withdrawal transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('transfer/:sourceAccountId/:targetAccountId')
  async transfer(
    @Param('sourceAccountId') sourceAccountId: number,
    @Param('targetAccountId') targetAccountId: number,
    @Body() transferDto: TransferDto,
  ) {
    const transferTransaction = new TransferDto();
    transferTransaction.type = 'transfer';
    transferTransaction.amount = transferDto.amount;
    transferTransaction.relatedAccountId = transferDto.relatedAccountId;

    const errors = await validate(transferTransaction);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.transactionService.transfer(sourceAccountId, targetAccountId, transferTransaction.amount);
    } catch (error) {
      throw new HttpException('Failed to process transfer transaction', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
