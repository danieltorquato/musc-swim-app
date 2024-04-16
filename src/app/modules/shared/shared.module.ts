import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/safe.pipe';
import { CTreinoMuscAlunoComponent } from 'src/app/components/c-treino-musc-aluno/c-treino-musc-aluno.component';
import { IonicModule } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SafetwoPipe } from 'src/app/safetwo.pipe';
import { register } from 'swiper/element';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


register();

@NgModule({
  declarations: [CTreinoMuscAlunoComponent, SafetwoPipe],
  exports: [CTreinoMuscAlunoComponent],
  imports: [
    CommonModule,
    IonicModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
schemas:[
  CUSTOM_ELEMENTS_SCHEMA
]})
export class SharedModule { }
