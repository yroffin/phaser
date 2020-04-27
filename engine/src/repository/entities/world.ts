import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { IsUUID, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@Entity("world")
@ObjectType()
export class World {
    @Field(type => ID)
    @ApiProperty({ type: 'string' })
    @IsUUID()
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "name" })
    name?: string

    @Field(() => [Scene], { defaultValue: [] })
    @ApiProperty({ type: () => Scene, isArray: true })
    @OneToMany<Scene>(() => Scene, scene => scene.world, { eager: true })
    scenes: Scene[];
}

@Entity("scene")
@ObjectType()
export class Scene {
    @Field(type => ID)
    @ApiProperty({ type: 'string' })
    @IsUUID()
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "name" })
    name?: string

    // World
    @Field()
    @ApiProperty({ type: () => World })
    @ManyToOne<World>(() => World, world => world.scenes, { lazy: true })
    world: World;

    // Camera
    @Field(() => [Camera], { defaultValue: [] })
    @ApiProperty({ type: () => Camera, isArray: true })
    @OneToMany<Camera>(() => Camera, camera => camera.scene, { eager: true })
    cameras: Camera[];
}

enum CameraType {
    FreeCamera = "FreeCamera",
    ArcRotateCamera = "ArcRotateCamera"
}

@Entity("camera")
@ObjectType()
export class Camera {
    @Field(type => ID)
    @ApiProperty({ type: 'string' })
    @IsUUID()
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "name" })
    name!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "type" })
    type!: CameraType

    @Field()
    @ApiProperty({ type: () => Scene })
    @ManyToOne<Scene>(() => Scene, scene => scene.cameras, { lazy: true })
    scene: Scene;
}
