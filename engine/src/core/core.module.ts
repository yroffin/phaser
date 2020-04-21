import { Module } from '@nestjs/common';
import { WorldService, ItemService } from './world/world.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { World, Item } from 'src/repository/entities/world';
import { WorldController, ItemController } from './world/world.controller';

@Module({
  imports: [TypeOrmModule.forFeature([World,Item])],
  providers: [WorldService,ItemService],
  controllers: [WorldController,ItemController]
})
export class CoreModule {}
