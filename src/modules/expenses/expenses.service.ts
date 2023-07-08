import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';

@Injectable()
export class ExpensesService {
  findAllService(params: object) {
    return `This action returns all expenses with params: ${Object.values(
      params,
    )}`;
  }

  createService(createExpenseDto: CreateExpenseDto) {
    // i can get object data with req too
    // return 'This action adds a new expense';
    return createExpenseDto;
  }

  updateService(data: CreateExpenseDto) {
    const newData = data;
    // newData['updatedAt'] = new Date().toString();
    return {
      old: data,
      new: newData,
    };
  }

  deleteService(deleteExpenseDto: DeleteExpenseDto) {
    return deleteExpenseDto;
  }
}
