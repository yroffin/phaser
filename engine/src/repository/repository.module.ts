import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { World, Scene, Camera } from './entities/world';
import { WorldResolver } from './world/world.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '.test.sqlite',
            entities: [World, Scene, Camera],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([World, Scene, Camera]),
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
