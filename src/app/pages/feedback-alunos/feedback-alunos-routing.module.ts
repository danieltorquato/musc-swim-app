import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackAlunosPage } from './feedback-alunos.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackAlunosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackAlunosPageRoutingModule {}
