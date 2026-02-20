import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { DBModule } from 'src/modules/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
