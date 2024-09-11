import { Injectable } from '@nestjs/common';
import { WheelRotation } from './wheel-rotation.entity';
import { generateRandomNumberWithDelay } from 'src/utils/random';
import { WheelRotationRepository } from './wheel-rotation.repository';
import { SseEventName, SseService } from '../sse/sse.service';

const MIN_PROCESSING_TIME_SEC = 0;
const MAX_PROCESSING_TIME_SEC = 5;

@Injectable()
export class WheelRotationService {
  constructor(
    private readonly wheelRotationRepository: WheelRotationRepository,
    private readonly sseService: SseService,
  ) {}

  getAll(): Promise<WheelRotation[]> {
    return this.wheelRotationRepository.getAll();
  }

  getById(id: string): Promise<WheelRotation[]> {
    return this.wheelRotationRepository.getById(id);
  }

  async create(): Promise<WheelRotation> {
    const startRotationDate = new Date();
    const createdRotationEntity = await this.wheelRotationRepository.create({
      startedAt: startRotationDate,
    });

    this.processRotation(createdRotationEntity.id);

    return createdRotationEntity;
  }

  async processRotation(id: string): Promise<void> {
    const result = await generateRandomNumberWithDelay({
      min: MIN_PROCESSING_TIME_SEC,
      max: MAX_PROCESSING_TIME_SEC,
    });
    const endedAt = new Date();
    const updatedRotation = await this.wheelRotationRepository.update(id, {
      result,
      endedAt,
    });
    this.sseService.emitEvent(SseEventName.ROTATION_RESULT, updatedRotation);
  }
}
