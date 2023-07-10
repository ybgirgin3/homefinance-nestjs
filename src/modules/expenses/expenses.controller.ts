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
      const service_response: object = await this.expenseService.create(
        createExpenseDto,
      );
      return service_response;
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
        message: 'Expense(s) Found',
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
  async findOne(@Param('id') id: string) {
    try {
      const expense = this.expenseService.findOne(id);
      return {
        status: 200,
        message: 'Expense Found',
        response: expense,
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
