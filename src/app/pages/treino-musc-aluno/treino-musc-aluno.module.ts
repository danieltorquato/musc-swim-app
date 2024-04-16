import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoMuscAlunoPageRoutingModule } from './treino-musc-aluno-routing.module';

import { TreinoMuscAlunoPage } from './treino-musc-aluno.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SafetwoPipe } from 'src/app/safetwo.pipe';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TreinoMuscAlunoPageRoutingModule,
    ScrollingModule,
    SharedModule
  ],
  declarations: [TreinoMuscAlunoPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class TreinoMuscAlunoPageModule {}
