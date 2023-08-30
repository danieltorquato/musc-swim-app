import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlunosPageRoutingModule } from './alunos-routing.module';

import { AlunosPage } from './alunos.page';
import { CAlunosComponent } from 'src/app/components/c-alunos/c-alunos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlunosPageRoutingModule
  ],
  declarations: [AlunosPage, CAlunosComponent]
})
export class AlunosPageModule {}
