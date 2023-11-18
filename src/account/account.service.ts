// account/account.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository ,FindOneOptions} from 'typeorm';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async createAccount(account: AccountEntity): Promise<AccountEntity> {
    return await this.accountRepository.save(account);
  }

  async getAllAccounts(): Promise<AccountEntity[]> {
    return await this.accountRepository.find();
  }

  async getAccountById(id: number): Promise<AccountEntity | undefined> {
    const options: FindOneOptions<AccountEntity> = { where: { id } };
    return await this.accountRepository.findOne(options);

  }

  async updateAccount(id: number, account: AccountEntity): Promise<AccountEntity | null> {
    const existingAccount = await this.getAccountById(id);
    if (existingAccount) {
      return await this.accountRepository.save({ ...existingAccount, ...account });
    }
    return null;
  }

  async deleteAccount(id: number): Promise<boolean> {
    const result = await this.accountRepository.delete(id);
    return  result.affected > 0;
  }
}
