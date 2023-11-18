// transaction/transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async deposit(accountId: number, amount: number): Promise<TransactionEntity> {
    // Implement deposit logic
    const depositTransaction = new TransactionEntity();
    depositTransaction.type = 'deposit';
    depositTransaction.amount = amount;
    depositTransaction.account = { id: accountId } as any; // Assuming account exists
    return await this.transactionRepository.save(depositTransaction);
  }

  async withdraw(accountId: number, amount: number): Promise<TransactionEntity> {
    // Implement withdrawal logic
    const withdrawalTransaction = new TransactionEntity();
    withdrawalTransaction.type = 'withdrawal';
    withdrawalTransaction.amount = amount;
    withdrawalTransaction.account = { id: accountId } as any; // Assuming account exists
    return await this.transactionRepository.save(withdrawalTransaction);
  }

  async transfer(sourceAccountId: number, targetAccountId: number, amount: number): Promise<TransactionEntity> {
    // Implement fund transfer logic
    const transferTransaction = new TransactionEntity();
    transferTransaction.type = 'transfer';
    transferTransaction.amount = amount;
    transferTransaction.account = { id: sourceAccountId } as any; // Assuming source account exists
    transferTransaction.relatedAccountId = targetAccountId;
    return await this.transactionRepository.save(transferTransaction);
  }
}
