export class CreateExpenseDto {
  product: string;
  user: string;
  purchase_case: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
