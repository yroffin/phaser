import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorldService, ItemService, SceneService } from './world.service';
import { Crud } from '@nestjsx/crud';
import { World, Item, Scene } from 'src/repository/entities/world';

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
            scenes: { eager: true },
            items: { eager: true },
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
    }
})
@Controller('scene')
export class SceneController {
    constructor(private service: SceneService) {
    }
}

@ApiTags('world')
@Crud({
    model: {
        type: Item
    }
})
@Controller('item')
export class ItemController {
    constructor(private service: ItemService) {
    }
}
