import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [TypeOrmModule.forFeature()]
})
export class StudentsModule {}
