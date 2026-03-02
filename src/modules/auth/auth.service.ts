import {
  Injectable,
  InternalServerErrorException,
  Scope,
} from '@nestjs/common';
import { getClerkClient } from '@guards/clerk/lib/clerk-client';
import { DBService } from '@modules/db/db.service';
import { userModel } from 'src/data/models';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(private dbService: DBService) {}

  async upsertUser(createUserDto: CreateUserDto) {
    try {
      const db = await this.dbService.getDb();
      const [newUser] = await db
        .insert(userModel)
        .values({
          userId: createUserDto.userId,
          username: createUserDto.username,
          avatarUrl: createUserDto.avatarUrl,
        })
        .onConflictDoUpdate({
          target: userModel.userId,
          set: {
            username: createUserDto.username,
            avatarUrl: createUserDto.avatarUrl,
            updatedAt: new Date().toISOString(),
          },
        })
        .returning();

      if (!newUser) {
        throw new InternalServerErrorException('Failed to upsert user');
      }

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('Failed to synchronize user');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.upsertUser(createUserDto);
  }

  async getUser(userId: string) {
    const clerkClient = getClerkClient();
    const user = await clerkClient.users.getUser(userId);

    return {
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };
  }
}
