import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhaserComponent } from './components/phaser/phaser.component';
import { BabylonComponent } from './components/babylon/babylon.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [{
  path: 'phaser',
  component: PhaserComponent
}, {
  path: 'babylon',
  component: BabylonComponent
}, {
  path: '',
  component: MainComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
