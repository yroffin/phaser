import { Resolver, Query } from '@nestjs/graphql';
import { World, Item, Scene } from '../entities/world';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver()
export class WorldResolver {

    constructor(
        @InjectRepository(World) private world,
        @InjectRepository(Scene) private scene,
        @InjectRepository(Item) private item) {

    }

    @Query(() => [World])
    async worlds(): Promise<World[]> {
        return await this.world.find();
    }

    @Query(() => [Item])
    async scenes(): Promise<Scene[]> {
        return await this.scene.find();
    }

    @Query(() => [Item])
    async items(): Promise<Item[]> {
        return await this.item.find();
    }
}
