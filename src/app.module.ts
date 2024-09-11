import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import env from './env';
import { WheelRotationModule } from './wheel-rotation/wheel-rotation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: env.DB_CONNECTION_URL,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    WheelRotationModule,
  ],
})
export class AppModule {}
