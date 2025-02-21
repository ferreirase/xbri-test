import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserProfile {
  VENDEDOR = 'vendedor',
  COMPRADOR = 'comprador',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  profile: UserProfile;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async checkPassword(plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
  }
}
