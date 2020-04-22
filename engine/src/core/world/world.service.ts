import { Injectable, Controller } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { World, Item, Scene } from 'src/repository/entities/world';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorldService extends TypeOrmCrudService<World> {
    constructor(@InjectRepository(World) repo) {
        super(repo);
    }
}

@Injectable()
export class SceneService extends TypeOrmCrudService<Scene> {
    constructor(@InjectRepository(Scene) repo) {
        super(repo);
    }
}

@Injectable()
export class ItemService extends TypeOrmCrudService<Item> {
    constructor(@InjectRepository(Item) repo) {
        super(repo);
    }
}
