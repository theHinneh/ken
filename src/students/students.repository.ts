import { EntityRepository, Repository } from 'typeorm';
import { Students } from './students.entity';

@EntityRepository(Students)
export class StudentsRepository extends Repository<Students> {
}
