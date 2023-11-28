import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoMuscAlunoPageRoutingModule } from './treino-musc-aluno-routing.module';

import { TreinoMuscAlunoPage } from './treino-musc-aluno.page';
import { CTreinoMuscAlunoComponent } from 'src/app/components/c-treino-musc-aluno/c-treino-musc-aluno.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoMuscAlunoPageRoutingModule,
    ScrollingModule
  ],
  declarations: [TreinoMuscAlunoPage, CTreinoMuscAlunoComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class TreinoMuscAlunoPageModule {}
