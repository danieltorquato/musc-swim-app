import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoPiscAlunoPage } from './treino-pisc-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoPiscAlunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinoPiscAlunoPageRoutingModule {}
