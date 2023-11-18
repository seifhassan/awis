
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { AccountEntity } from '../account/account.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  type: string; // 'deposit', 'withdrawal', 'transfer'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  account: AccountEntity;

  @Column({ nullable: true })
  @IsNumber()
  relatedAccountId: number; 
}
