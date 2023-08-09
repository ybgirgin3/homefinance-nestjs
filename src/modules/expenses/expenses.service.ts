import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './schemas/expense.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import { ObjectId } from 'bson';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const isExists = await this.expenseModel
      .findOne({
        product: createExpenseDto.product,
        user: createExpenseDto.user,
        purchase_case: createExpenseDto.purchase_case,
        price: createExpenseDto.price,
      })
      .lean();

    if (isExists) {
      return null;
    } else {
      return this.expenseModel.create(createExpenseDto);
    }
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().exec();
  }

  async findOne(id: string): Promise<Expense> {
    return this.expenseModel.findOne({ _id: id }).exec();
  }

  async findOneAndUpdate(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    // update `UpdatedAt` element
    updateExpenseDto['updatedAt'] = Date.now().toString();

    return this.expenseModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateExpenseDto },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string): Promise<Expense> {
    return await this.expenseModel.findByIdAndRemove({ _id: id }).exec();
  }
}
