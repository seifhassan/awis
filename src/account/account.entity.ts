// account/account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { TransactionEntity } from '../transaction/transaction.entity';
import { UserEntity } from '../user/user.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  accountNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsNumber()
  @IsPositive()
  balance: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user: UserEntity;
}
