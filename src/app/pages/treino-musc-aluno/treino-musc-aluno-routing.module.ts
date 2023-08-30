import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreinoMuscAlunoPage } from './treino-musc-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoMuscAlunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreinoMuscAlunoPageRoutingModule {}
