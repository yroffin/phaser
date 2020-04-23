import { Module } from '@nestjs/common';
import { WorldService, SceneService, CameraService } from './world/world.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World, Scene, Camera } from 'src/repository/entities/world';
import { WorldController, SceneController, CameraController } from './world/world.controller';

@Module({
  imports: [TypeOrmModule.forFeature([World,Scene,Camera])],
  providers: [WorldService,SceneService,CameraService],
  controllers: [WorldController,SceneController, CameraController]
})
export class CoreModule {}
