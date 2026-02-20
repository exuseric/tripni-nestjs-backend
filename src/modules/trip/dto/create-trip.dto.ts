import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { CreateTrip } from 'src/shared/types/model.types';

export class CreateTripDto implements CreateTrip {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  coverImage: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery: string[];

  @IsOptional()
  @IsBoolean()
  isFavorite: boolean;

  @IsOptional()
  @IsBoolean()
  isPublic: boolean;

  @IsOptional()
  @IsNumber()
  parentTripId: number;

  @IsOptional()
  @IsBoolean()
  isVisited: boolean;
}
