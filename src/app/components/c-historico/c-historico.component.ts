import { Component, OnInit } from '@angular/core';
import { doc, updateDoc, getFirestore, onSnapshot, collection, getDocs, getDoc, query, DocumentData, orderBy, where } from 'firebase/firestore';
import { Validators } from '@angular/forms';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
@Component({
  selector: 'app-c-historico',
  templateUrl: './c-historico.component.html',
  styleUrls: ['./c-historico.component.scss'],
})
export class CHistoricoComponent implements OnInit {
  db = getFirestore();
  uid: any;
list: any;
data= new Date();
dia= String(this.data.getDate());
mes= String(this.data.toLocaleString('pt-BR', { month: 'long' }));
ano= String(this.data.getFullYear());
  dataAtual= `${this.dia}/${this.mes}/${this.ano}`;
  items: any;
  listArray:any[] = [];
  auth = getAuth();
  listRef: any;
  docRef: any;
  querySnapshot: any;
  userData: any;
  formbuilder: any;

  constructor() { }

 ngOnInit() {
    //Captura usuário atual
    onAuthStateChanged(this.auth, async (user: any) => {
      this.uid = user.uid;
      const q  = query (collection(this.db, 'users', this.uid, 'history'), where('year','==',this.ano), orderBy("timestamp", "desc"));
const querySnapshots = await getDocs(q);
    querySnapshots.forEach((doc) => {

      // doc.data() is never undefined for query doc snapshots

      this.listArray.push(doc.data());
      console.log(this.listArray);
  });
    });


}
onIonInfinite(ev: InfiniteScrollCustomEvent) {
  setTimeout(() => {
    (ev as InfiniteScrollCustomEvent).target.complete();
  }, 500);
}
getId(id: any){
  console.log(id);
}
}

