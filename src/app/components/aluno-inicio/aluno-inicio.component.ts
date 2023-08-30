import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-aluno-inicio',
  templateUrl: './aluno-inicio.component.html',
  styleUrls: ['./aluno-inicio.component.scss'],
})
export class AlunoInicioComponent  implements OnInit {
  uid: string | null = "";

  constructor() { }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        console.log("Usuário logado: " + this.uid)
      } else {
        alert('Você precisa estar logado');
      }
    });
  }

}
