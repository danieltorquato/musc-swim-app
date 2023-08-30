import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoMuscAlunoPageRoutingModule } from './treino-musc-aluno-routing.module';

import { TreinoMuscAlunoPage } from './treino-musc-aluno.page';
import { CTreinoMuscAlunoComponent } from 'src/app/components/c-treino-musc-aluno/c-treino-musc-aluno.component';
import { SafePipe } from 'src/app/safe.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoMuscAlunoPageRoutingModule,
  ],
  declarations: [TreinoMuscAlunoPage, CTreinoMuscAlunoComponent]
})
export class TreinoMuscAlunoPageModule {}
