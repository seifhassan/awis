// typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'postgres',
  password: '12345',
  database: 'your_database_name',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
