import { Resolver, Query } from '@nestjs/graphql';
import { World, Item } from '../entities/world';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver()
export class WorldResolver {

    constructor(
        @InjectRepository(World) private world,
        @InjectRepository(Item) private Item) {

    }

    @Query(() => [World])
    async worlds(): Promise<World[]> {
        return await this.world.find();
    }

    @Query(() => [Item])
    async items(): Promise<World[]> {
        return await this.Item.find();
    }
}
