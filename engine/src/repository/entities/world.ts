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

    @Field(() => [Scene], {defaultValue: []})
    @ApiProperty({ type: () => Scene, isArray: true })
    @OneToMany<Scene>(() => Scene, scene => scene.world, {eager: true})
    scenes: Scene[];

    @Field(() => [Item], {defaultValue: []})
    @ApiProperty({ type: () => Item, isArray: true})
    @OneToMany<Item>(() => Item, item => item.world, {eager: true})
    items: Item[];
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

    @Field()
    @ApiProperty({ type: () => World })
    @ManyToOne<World>(() => World, world => world.items, {lazy: true})
    world: World;
}

@Entity("item")
@ObjectType()
export class Item {
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

    @Field()
    @ApiProperty({ type: () => World })
    @ManyToOne<World>(() => World, world => world.items, {lazy: true})
    world: World;
}
