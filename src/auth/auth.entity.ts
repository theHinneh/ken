import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './jwt/jwt.strategy';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  status: string

  @Column()
  salt: string;

  @Column()
  @Index({ unique: true })
  email: string;
}
