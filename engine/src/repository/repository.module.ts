import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { World, Item } from './entities/world';
import { WorldResolver } from './world/world.resolver';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: '.test.sqlite',
            entities: [World, Item],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([World,Item]),
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
