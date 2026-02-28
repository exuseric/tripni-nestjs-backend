import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { WebhooksController } from './webhooks.controller';
import { AuthService } from './auth.service';
import { DBModule } from 'src/modules/db/db.module';

@Module({
  controllers: [AuthController, WebhooksController],
  providers: [AuthService],
})
export class AuthModule {}
