import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  product?: string;
  user?: string;
  purchase_case?: string;
  quantity?: number;
  price?: number;
  updatedAt?: string;
}
