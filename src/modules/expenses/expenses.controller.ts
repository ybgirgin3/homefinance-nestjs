import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './schemas/expense.schema';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    await this.expenseService.create(createExpenseDto);
  }

  @Get()
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.expenseService.delete(id);
  }
}
