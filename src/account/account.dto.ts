
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  accountNumber: string;

  @IsNumber()
  @IsPositive()
  initialBalance: number;
}
