import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AspiratorComponent} from "./aspirator/aspirator.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AspiratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
