import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserProfile } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    await this.findoneByEMail(data.email);

    if (!Object.keys(UserProfile).includes(data.profile)) {
      throw new HttpException('Invalid profile', 400);
    }

    const user = this.userRepository.create({
      ...data,
      profile: UserProfile[data.profile],
    });

    return await this.userRepository.save(user);
  }

  async findoneByEMail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new HttpException('User not found', 400);

    return user;
  }
}
