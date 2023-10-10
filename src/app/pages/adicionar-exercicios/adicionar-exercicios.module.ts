import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarExerciciosPageRoutingModule } from './adicionar-exercicios-routing.module';

import { AdicionarExerciciosPage } from './adicionar-exercicios.page';
import { CAdicionarExerciciosComponent } from 'src/app/components/c-adicionar-exercicios/c-adicionar-exercicios.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SafePipe } from 'src/app/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarExerciciosPageRoutingModule,
    ScrollingModule
  ],
  declarations: [AdicionarExerciciosPage, CAdicionarExerciciosComponent, SafePipe]
})
export class AdicionarExerciciosPageModule {}
