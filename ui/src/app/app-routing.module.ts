import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhaserComponent } from './components/phaser/phaser.component';
import { BabylonComponent } from './components/babylon/babylon.component';
import { MainComponent } from './components/main/main.component';
import { WorldComponent } from './components/world/world.component';


const routes: Routes = [{
  path: 'phaser',
  component: PhaserComponent
}, {
  path: 'babylon',
  component: BabylonComponent
}, {
  path: 'worlds',
  component: WorldComponent
},
{
  path: '',
  component: WorldComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
