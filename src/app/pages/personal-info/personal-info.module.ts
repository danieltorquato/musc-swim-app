import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalInfoPageRoutingModule } from './personal-info-routing.module';

import { PersonalInfoPage } from './personal-info.page';
import { CPersonalInfoComponent } from 'src/app/components/c-personal-info/c-personal-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInfoPageRoutingModule
  ],
  declarations: [PersonalInfoPage, CPersonalInfoComponent]
})
export class PersonalInfoPageModule {}
