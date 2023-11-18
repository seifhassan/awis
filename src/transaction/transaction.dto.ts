
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class TransactionDto {
  @IsNotEmpty()
  type: string; // 'deposit', 'withdrawal', 'transfer'

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class TransferDto extends TransactionDto {
  @IsNumber()
  @IsPositive()
  relatedAccountId: number;
}
