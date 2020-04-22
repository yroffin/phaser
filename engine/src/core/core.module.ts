import { Module } from '@nestjs/common';
import { WorldService, ItemService, SceneService } from './world/world.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World, Item, Scene } from 'src/repository/entities/world';
import { WorldController, ItemController, SceneController } from './world/world.controller';

@Module({
  imports: [TypeOrmModule.forFeature([World,Item,Scene])],
  providers: [WorldService,ItemService,SceneService],
  controllers: [WorldController,ItemController,SceneController]
})
export class CoreModule {}
