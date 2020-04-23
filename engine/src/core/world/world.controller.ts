import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorldService, SceneService, CameraService } from './world.service';
import { Crud } from '@nestjsx/crud';
import { World, Scene, Camera } from 'src/repository/entities/world';

@ApiTags('world')
@Crud({
    model: {
        type: World
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            scenes: { eager: true }
        }
    }
})
@Controller('world')
export class WorldController {
    constructor(private service: WorldService) {
    }
}

@ApiTags('scene')
@Crud({
    model: {
        type: Scene
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
    query: {
        join: {
            cameras: { eager: true }
        }
    }
})
@Controller('scene')
export class SceneController {
    constructor(private service: SceneService) {
    }
}

@ApiTags('camera')
@Crud({
    model: {
        type: Camera
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
})
@Controller('camera')
export class CameraController {
    constructor(private service: CameraService) {
    }
}
