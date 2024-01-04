import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackAlunosPageRoutingModule } from './feedback-alunos-routing.module';

import { FeedbackAlunosPage } from './feedback-alunos.page';
import { CFeedbackAlunosComponent } from 'src/app/components/c-feedback-alunos/c-feedback-alunos.component';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbackAlunosPageRoutingModule,
    ScrollingModule
  ],
  declarations: [FeedbackAlunosPage, CFeedbackAlunosComponent]
})
export class FeedbackAlunosPageModule {}
