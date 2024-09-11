import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WheelRotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startedAt: Date;

  @Column({ nullable: true })
  endedAt?: Date;

  @Column({ nullable: true })
  result?: number;
}
