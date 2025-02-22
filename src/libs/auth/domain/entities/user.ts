import { Email, Password } from '../value-objects';

export enum UserProfile {
  BUYER = 'buyer',
  SELLER = 'seller',
}

export class User {
  private constructor(
    readonly name: string,
    readonly email: Email,
    readonly password: Password,
    readonly profile: UserProfile,
    readonly id?: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile = profile;
  }

  static create(
    name: string,
    email: Email,
    password: Password,
    profile: UserProfile,
  ) {
    return new User(name, email, password, profile);
  }

  static buildExistingUser(
    name: string,
    email: string,
    profile: string,
    hash: string,
    salt: string,
    id?: string,
  ) {
    return new User(
      name,
      new Email(email),
      new Password(hash, salt),
      UserProfile[profile],
      id,
    );
  }

  validatePassword(password: string) {
    return this.password.validate(password);
  }
}
