import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import env from './env';
import { WheelRotationModule } from './wheel-rotation/wheel-rotation.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: env.DB_CONNECTION_URL,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    WheelRotationModule,
  ],
})
export class AppModule {}
