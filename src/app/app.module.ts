import { SharedModule } from './modules/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from 'src/environments/environment';
import { SafePipe } from './safe.pipe';
import { CCadastroComponent } from './components/c-cadastro/c-cadastro.component';
import { CTreinoMuscAlunoComponent } from './components/c-treino-musc-aluno/c-treino-musc-aluno.component';
import { SafetwoPipe } from './safetwo.pipe';

@NgModule({
  declarations: [AppComponent, SafetwoPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
