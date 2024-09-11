import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Sse,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseEventName, SseService } from '../sse/sse.service';
import { WheelRotationService } from './wheel-rotation.service';
import { WheelRotation } from './wheel-rotation.entity';

@Controller('wheel-rotation')
export class WheelRotationController {
  constructor(
    private readonly wheelRotationService: WheelRotationService,
    private readonly sseService: SseService,
  ) {}

  @Get()
  getWheelRotations(): Promise<WheelRotation[]> {
    return this.wheelRotationService.getAll();
  }

  @Get('/:id')
  async getWheelRotationById(
    @Param('id', ParseUUIDPipe) rotationId: string,
  ): Promise<WheelRotation> {
    const rotations = await this.wheelRotationService.getById(rotationId);
    const rotation = rotations[0];

    if (!rotation) {
      throw new NotFoundException('Rotation not found');
    }

    return rotation;
  }

  @Post()
  async startWheel(): Promise<{ id: string }> {
    const wheelRotation = await this.wheelRotationService.create();
    return { id: wheelRotation.id };
  }

  @Sse('sse/result')
  sse(): Observable<MessageEvent> {
    return this.sseService.createObservable(SseEventName.ROTATION_RESULT);
  }
}
