import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Students extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
