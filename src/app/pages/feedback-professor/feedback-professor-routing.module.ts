import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackProfessorPage } from './feedback-professor.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbackProfessorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackProfessorPageRoutingModule {}
