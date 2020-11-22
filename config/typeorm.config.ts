import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Auth } from '../src/auth/auth.entity';
import { Students } from '../src/students/students.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'theHinneh',
  password: 'admin',
  port: 5432,
  database: 'bless-wheels',
  synchronize: true,
  entities: [Auth, Students],
};
