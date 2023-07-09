import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './schemas/expense.schema';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    try {
      // if data already exist
      const isExists = this.findOne({
        purchase_case: createExpenseDto.purchase_case,
        product: createExpenseDto.product,
      });
      if (isExists) {
        return {
          status: 409,
          message: 'Data Already Exist',
          response: isExists,
        };
      }
      const data = await this.expenseService.create(createExpenseDto);
      return {
        status: 201,
        message: 'Expense Created',
        response: data,
      };
    } catch {
      return {
        status: 403,
        message: 'Forbidden',
        response: [],
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.expenseService.findAll();
      return {
        status: 200,
        message: 'Expense Found',
        response: data,
      };
    } catch {
      return {
        status: 404,
        message: 'Not Found',
        response: [],
      };
    }
  }

  @Get(':id')
  async findOne(d: object) {
    try {
      const data = await this.expenseService.findOne(
        // @ts-ignore
        d.purchase_case,

        // @ts-ignore
        d.product,
      );
      return {
        status: 200,
        message: 'Expense Found',
        response: data,
      };
    } catch {
      return {
        status: 404,
        message: 'Not Found',
        response: [],
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.expenseService.delete(id);
  }
}
