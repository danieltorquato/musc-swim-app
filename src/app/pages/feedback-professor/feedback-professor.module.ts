import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackProfessorPageRoutingModule } from './feedback-professor-routing.module';

import { FeedbackProfessorPage } from './feedback-professor.page';
import { CFeedbackProfessorComponent } from 'src/app/components/c-feedback-professor/c-feedback-professor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackProfessorPageRoutingModule
  ],
  declarations: [FeedbackProfessorPage, CFeedbackProfessorComponent]
})
export class FeedbackProfessorPageModule {}
