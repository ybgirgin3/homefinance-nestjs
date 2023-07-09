import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema()
export class Expense {
  @Prop()
  product: string;

  @Prop()
  user: string;

  @Prop()
  purchase_case: string;

  @Prop()
  price: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: number;

  @Prop({ type: Date, default: Date.now })
  updatedAt: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
