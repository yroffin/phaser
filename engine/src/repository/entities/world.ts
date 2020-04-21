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

    @Field(() => [Item], {defaultValue: []})
    @ApiProperty({ type: () => Item })
    @OneToMany<Item>(() => Item, item => item.world, {eager: true})
    items: Item[];
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
