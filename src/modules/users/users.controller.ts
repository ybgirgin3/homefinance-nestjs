import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { MessageResponse } from 'src/interfaces/responses';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // return this.usersService.create(createUserDto);
    try {
      const serviceResponse: User | null = await this.usersService.create(
        createUserDto,
      );
      return {
        status: serviceResponse ? 201 : 409,
        message: serviceResponse
          ? 'Date Created Successfully'
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
  async findAll() {
    // return this.usersService.findAll();
    try {
      const data: User[] = await this.usersService.findAll();
      return {
        status: 200,
        message: 'User(s) Found',
        response: data,
      };
    } catch {
      return {
        status: 403,
        message: 'Not Found',
        response: null,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MessageResponse> {
    // return this.usersService.findOne(+id);
    try {
      const user: Promise<User> = this.usersService.findOne(id);
      return {
        status: 200,
        message: 'User Found',
        response: user,
      };
    } catch {
      return {
        status: 403,
        message: 'Not Found',
        response: null,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<MessageResponse> {
    try {
      const responseFromModel: User = await this.usersService.findOneAndUpdate(
        id,
        updateUserDto,
      );
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
  async delete(@Param('id') id: string) {
    // return this.usersService.delete(id);
    return {
      status: 204,
      message: 'Data Deleted Successfully',
      response: null,
    };
  }
}
