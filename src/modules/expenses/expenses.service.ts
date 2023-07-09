import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return await this.expenseModel.create(createExpenseDto);
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async findOne(purchase_case: string, product: string): Promise<Expense> {
    return this.expenseModel
      .findOne({ purchase_case: purchase_case, product: product })
      .exec();
  }

  async delete(id: string) {
    return await this.expenseModel.findByIdAndRemove({ _id: id }).exec();
  }
}
