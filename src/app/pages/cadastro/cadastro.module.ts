import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';
import { CCadastroComponent } from 'src/app/components/c-cadastro/c-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CadastroPage, CCadastroComponent]
})
export class CadastroPageModule {}
