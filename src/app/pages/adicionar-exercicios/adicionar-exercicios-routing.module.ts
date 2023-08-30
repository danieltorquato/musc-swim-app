import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarExerciciosPage } from './adicionar-exercicios.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarExerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarExerciciosPageRoutingModule {}
