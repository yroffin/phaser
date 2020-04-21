import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './repository/repository.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CoreModule } from './core/core.module';

@Module({
  imports: [RepositoryModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
