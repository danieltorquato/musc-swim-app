import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from 'src/environments/environment';

@Component({
  selector: 'app-aluno-inicio',
  templateUrl: './aluno-inicio.component.html',
  styleUrls: ['./aluno-inicio.component.scss'],
})
export class AlunoInicioComponent implements OnInit {
  uid: string | null = "";
  items: any[] = [];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {

    onAuthStateChanged(auth, (user) => {
      if (user) {

        this.uid = user.uid;

        const docRef = onSnapshot(doc(db, 'users/', this.uid), (doc) => {
          this.items.push(doc.data());
          (this.items);
        })
      } else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }
  logout() {
    signOut(auth).then(() => {
      this.navCtrl.navigateRoot('login');
    }).catch((error) => {
      // An error happened.
    });
  }
  getId(id: any) {
  }

}

