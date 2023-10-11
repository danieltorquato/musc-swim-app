import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreinoPiscAlunoPageRoutingModule } from './treino-pisc-aluno-routing.module';

import { TreinoPiscAlunoPage } from './treino-pisc-aluno.page';
import { CTreinoPiscAlunoComponent } from 'src/app/components/c-treino-pisc-aluno/c-treino-pisc-aluno.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreinoPiscAlunoPageRoutingModule
  ],
  declarations: [TreinoPiscAlunoPage, CTreinoPiscAlunoComponent]
})
export class TreinoPiscAlunoPageModule {}
