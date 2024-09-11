import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WheelRotation } from './wheel-rotation.entity';

@Injectable()
export class WheelRotationRepository {
  constructor(
    @InjectRepository(WheelRotation)
    private wheelRotationRepository: Repository<WheelRotation>,
  ) {}

  getAll(): Promise<WheelRotation[]> {
    return this.wheelRotationRepository.createQueryBuilder().getMany();
  }

  getById(id: string): Promise<WheelRotation[]> {
    return this.wheelRotationRepository.find({
      select: ['id', 'startedAt', 'endedAt', 'result'],
      where: { id },
    });
  }

  create(rotation: Omit<WheelRotation, 'id'>): Promise<WheelRotation> {
    return this.wheelRotationRepository.save(rotation);
  }

  update(
    id: string,
    rotation: Pick<WheelRotation, 'endedAt' | 'result'>,
  ): Promise<WheelRotation> {
    return this.wheelRotationRepository.save({
      id,
      ...rotation,
    });
  }
}
