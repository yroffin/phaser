import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhaserComponent } from './components/phaser/phaser.component';
import { BabylonComponent } from './components/babylon/babylon.component';
import { MainComponent } from './components/main/main.component';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WorldComponent } from './components/world/world.component';

import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PhaserComponent,
    BabylonComponent,
    MainComponent,
    WorldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreModule.forRoot({}, {}),
    TreeTableModule,
    ButtonModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
