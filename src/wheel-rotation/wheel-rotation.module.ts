import { Module } from '@nestjs/common';
import { WheelRotationService } from './wheel-rotation.service';
import { WheelRotationController } from './wheel-rotation.controller';
import { WheelRotation } from './wheel-rotation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WheelRotationRepository } from './wheel-rotation.repository';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [TypeOrmModule.forFeature([WheelRotation]), SseModule],
  controllers: [WheelRotationController],
  providers: [WheelRotationService, WheelRotationRepository],
})
export class WheelRotationModule {}
