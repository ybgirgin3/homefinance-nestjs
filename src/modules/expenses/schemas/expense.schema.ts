import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { User } from '../../user/entities/user.entity';

@Schema()
export class Expense extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: User.name,
  })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  productName: string;

  @Prop({ type: String })
  case: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
