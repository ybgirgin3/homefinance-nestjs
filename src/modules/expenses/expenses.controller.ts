import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { MessageResponse } from '../../interfaces/responses';
import { Expense } from './schemas/expense.schema';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenseService: ExpensesService) {}

  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<MessageResponse> {
    try {
      const serviceResponse: Expense | null = await this.expenseService.create(
        createExpenseDto,
      );
      return {
        status: serviceResponse ? 201 : 409,
        message: serviceResponse
          ? 'Data Created Successfully'
          : 'Data Already Exists',
        response: serviceResponse,
      };
    } catch {
      return {
        status: 403,
        message: 'Forbidden',
        response: null,
      };
    }
  }

  @Get()
  async findAll(): Promise<MessageResponse> {
    try {
      const data: Expense[] = await this.expenseService.findAll();
      return {
        status: 200,
        message: 'Expense(s) Found',
        response: data,
      };
    } catch {
      return {
        status: 404,
        message: 'Not Found',
        response: null,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MessageResponse> {
    try {
      const expense: Promise<Expense> = this.expenseService.findOne(id);
      return {
        status: 200,
        message: 'Expense Found',
        response: expense,
      };
    } catch {
      return {
        status: 404,
        message: 'Not Found',
        response: null,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<MessageResponse> {
    try {
      const responseFromModel: Expense =
        await this.expenseService.findOneAndUpdate(id, updateExpenseDto);
      return {
        status: 204,
        message: 'Data Updated Successfully',
        response: responseFromModel,
      };
    } catch (e) {
      return {
        status: 404,
        message: 'Not Found',
        response: [],
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MessageResponse> {
    // return this.expenseService.delete(id);
    return {
      status: 204,
      message: 'Data Deleted Successfully',
      response: null,
    };
  }
}
