export class UserEntity {
  constructor(
    public name: string,
    public profile: string,
    public email: string,
    public password: string,
    public salt: string,
    public id?: string,
  ) {}
}
