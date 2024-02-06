import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from 'src/environments/environment';
import * as _ from 'lodash';
@Component({
  selector: 'app-c-alunos',
  templateUrl: './c-alunos.component.html',
  styleUrls: ['./c-alunos.component.scss'],
})
export class CAlunosComponent  implements OnInit {
  uid: string = " ";
  id: string = "";
  data: any;
  items: any[] = [];
  results: any[] = [];
  queryText: string = "";

  constructor() { }

  ngOnInit() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        this.searchPupils();
      } else {
        console.log('Você precisa estar logado');
      }
    });
  }
  async searchPupils(){


    this.queryText='';
    const queryLa = collection(db, 'users');
        const q = query(queryLa, where('professor', '==', this.uid));
        const queryL = await getDocs(q);
        queryL.forEach(async (docs) => {
          this.id = docs.id;
          const docRef = doc(db, 'users', this.id);
          this.data = await getDoc(docRef);
          const docRefs = doc(db, 'users', this.uid, 'pupils', this.data.id);
          setDoc(docRefs, this.data.data());
          this.items.push(this.data.data());

        });
}
handleChange(event: any) {

  const query = event.target.value;
  // eslint-disable-next-line eqeqeq
  if (query && query.trim() != '') {
    this.items = _.values(this.results);
    this.items = this.items.filter((dados: { name: string; }) => dados.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }else{
    this.items = this.results;
  }
}
async pegaId(id: any){
console.log(id);
}
}
