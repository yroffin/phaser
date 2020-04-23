import { Resolver, Query } from '@nestjs/graphql';
import { World, Scene, Camera } from '../entities/world';
import { InjectRepository } from '@nestjs/typeorm';

@Resolver()
export class WorldResolver {

    constructor(
        @InjectRepository(World) private world,
        @InjectRepository(Scene) private scene,
        @InjectRepository(Camera) private camera
    ) {

    }

    @Query(() => [World])
    async worlds(): Promise<World[]> {
        return await this.world.find();
    }

    @Query(() => [Scene])
    async scenes(): Promise<Scene[]> {
        return await this.scene.find();
    }

    @Query(() => [Camera])
    async cameras(): Promise<Camera[]> {
        return await this.camera.find();
    }
}
