
import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = new UserEntity();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      return await this.userService.createUser(user);
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | undefined> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity | null> {
    try {
      const user = new UserEntity();
      user.username = updateUserDto.username;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      return await this.userService.updateUser(id, user);
    } catch (error) {
      throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
