import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarExerciciosPageRoutingModule } from './adicionar-exercicios-routing.module';

import { AdicionarExerciciosPage } from './adicionar-exercicios.page';
import { CAdicionarExerciciosComponent } from 'src/app/components/c-adicionar-exercicios/c-adicionar-exercicios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarExerciciosPageRoutingModule,
  ],
  declarations: [AdicionarExerciciosPage, CAdicionarExerciciosComponent]
})
export class AdicionarExerciciosPageModule {}
