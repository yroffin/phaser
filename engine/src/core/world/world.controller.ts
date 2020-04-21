import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorldService, ItemService } from './world.service';
import { Crud } from '@nestjsx/crud';
import { World, Item } from 'src/repository/entities/world';

@ApiTags('world')
@Crud({
    model: {
        type: World
    }
})
@Controller('world')
export class WorldController {
    constructor(private service: WorldService) {
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
