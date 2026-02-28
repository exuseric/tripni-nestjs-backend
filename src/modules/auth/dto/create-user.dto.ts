import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The unique ID of the user (e.g., from Clerk)' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The first name of the user' })
  username: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: 'The URL of the user avatar image',
    required: false,
  })
  avatarUrl?: string;
}
