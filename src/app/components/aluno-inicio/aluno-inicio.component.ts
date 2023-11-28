import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from 'src/environments/environment';

@Component({
  selector: 'app-aluno-inicio',
  templateUrl: './aluno-inicio.component.html',
  styleUrls: ['./aluno-inicio.component.scss'],
})
export class AlunoInicioComponent  implements OnInit {
  uid: string | null = "";
  listArray: any[] = [];
  items: any;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        console.log("Usuário logado: " + this.uid)
        const docRef = onSnapshot(doc(db, 'users/', this.uid), (doc) => {
          this.listArray.push(doc.data());
          console.log(this.listArray);
      })}else {
        this.navCtrl.navigateRoot('login');
      }
    });
  }
logout(){
  signOut(auth).then(() => {
    this.navCtrl.navigateRoot('login');
  }).catch((error) => {
    // An error happened.
  });
}
getId(id: any){
console.log(id)
}
}

