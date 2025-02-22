import { EntitySchema } from 'typeorm';
import { User as UserEntity, UserProfile } from '../../../../domain/entities';
import { Email, Password } from '../../../../domain/value-objects';

export const UserSchema = new EntitySchema<UserEntity>({
  name: 'User',
  tableName: 'users',
  target: UserEntity,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    profile: {
      type: 'enum',
      enum: UserProfile,
      nullable: false,
      default: UserProfile.BUYER,
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: false,
      transformer: {
        to: (email: Email) => email.getValue(),
        from: (email: string) => new Email(email),
      },
    },
    password: {
      type: 'jsonb',
      nullable: false,
      transformer: {
        to: (pass: Password) => pass.toJSON(),
        from: (pass: { value: string; salt: string }) =>
          Password.fromJSON(pass),
      },
    },
  },
});
