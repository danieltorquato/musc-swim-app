import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from 'src/environments/environment';
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
  dataArray: any[] = [];
  results: any[] = [];
  queryText: string = "";

  constructor() { }

  ngOnInit() {
    this.searchPupils();
  }
  async searchPupils(){
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        console.log("Usuário logado: " + this.uid)
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
              this.dataArray.push(this.data.data());
              console.log(this.dataArray);
              this.results.push(this.dataArray);
            });
      } else {
        alert('Você precisa estar logado');
      }
    });


}
handleChange(event: any) {

  console.log(event.target.value);
  const query = event.target.value;
  // eslint-disable-next-line eqeqeq
  if (query && query.trim() != '') {
    this.results = _.values(this.dataArray);
    console.log(this.results);
    this.results = this.results.filter((dados: { name: string; }) => dados.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
    console.log(this.results);
  }else{
    this.results = this.dataArray;
  }
}
async pegaId(id: any){
console.log(id);
}
}
