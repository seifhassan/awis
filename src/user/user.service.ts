// user/user.service.ts
import { Injectable, CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import * as cacheManager from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

 
  @Cacheable({ ttl: 60 }) // Cache for 60 seconds
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }


  @Cacheable({ ttl: 60 }) 
  async getUserById(id: number): Promise<UserEntity | undefined> {
    const options: FindOneOptions<UserEntity> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async updateUser(id: number, user: UserEntity): Promise<UserEntity | null> {
    const existingUser = await this.getUserById(id);
    if (existingUser) {
      return this.userRepository.save({ ...existingUser, ...user });
    }
    return null;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}


