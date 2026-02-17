import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripModule } from './trip/trip.module';
import { DestinationModule } from './destination/destination.module';
import { TravelDetailModule } from './travel-detail/travel-detail.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [TripModule, DestinationModule, TravelDetailModule, BookmarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
