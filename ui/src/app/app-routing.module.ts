import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhaserComponent } from './components/phaser/phaser.component';


const routes: Routes = [{
  path: '',
  component: PhaserComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
