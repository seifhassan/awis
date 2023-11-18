import { Module , CacheModule  } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CacheModule.register(),],
  controllers: [UserController],
  providers: [UserService,UserEntity]
})
export class UserModule {}
