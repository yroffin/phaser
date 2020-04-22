import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { World, Item, Scene } from './entities/world';
import { WorldResolver } from './world/world.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '.test.sqlite',
            entities: [World, Item, Scene],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([World,Item,Scene]),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
        })],
    exports: [
    ],
    providers: [
        WorldResolver
    ]
})
export class RepositoryModule {
}
