import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  find(@Query() query: any) {
    return this.expensesService.findAllService(query);
  }

  // create(@Req() createExpenseDto: CreateExpenseDto) {
  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    // require validation here
    return {
      msg: 'data created',
      data: this.expensesService.createService(createExpenseDto),
    };
  }

  @Put()
  update(@Body() updateBody: CreateExpenseDto) {
    return {
      msg: 'data updated',
      data: this.expensesService.updateService(updateBody),
    };
  }

  @Delete()
  delete(@Body() deleteExpenseDto: DeleteExpenseDto) {
    // require validation here
    return {
      msg: 'data deleted',
      data: this.expensesService.deleteService(deleteExpenseDto),
    };
  }
}
