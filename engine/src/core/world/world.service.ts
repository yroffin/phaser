import { Injectable, Controller } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { World, Scene, Camera } from 'src/repository/entities/world';
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
export class CameraService extends TypeOrmCrudService<Camera> {
    constructor(@InjectRepository(Camera) repo) {
        super(repo);
    }
}
