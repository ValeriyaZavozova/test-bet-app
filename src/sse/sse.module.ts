import { Module } from '@nestjs/common';
import { SseService } from './sse.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [SseService],
  exports: [SseService],
})
export class SseModule {}
