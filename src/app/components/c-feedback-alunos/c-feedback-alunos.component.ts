import { db } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, onSnapshot, where, orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-c-feedback-alunos',
  templateUrl: './c-feedback-alunos.component.html',
  styleUrls: ['./c-feedback-alunos.component.scss'],
})
export class CFeedbackAlunosComponent  implements OnInit {
  feedbacks: any[] = [];
  uid: string = "";
  auth = getAuth();
  idDoc: any;
  dataDoc: any;
  selectedSegment: string = '';

  constructor() { }

  ngOnInit() {
    if (this.selectedSegment == '') {
      this.selectedSegment = "Respondido";
    }
    (this.selectedSegment)
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {

        this.uid = user.uid;
        ("Usuário logado: " + this.uid)
        this.searchFeedbacks(this.selectedSegment);
      } else {
        alert('Você precisa estar logado');
      }
    });
  }
  async searchFeedbacks(type: any) {
    const q = query(collection(db, "users", this.uid, "sendFeedbacks"), where("answered", "==", type));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    this.feedbacks = [];
    querySnapshot.forEach((doc) => {
        this.feedbacks.push(doc.data());
    });
  });
  }
  toggleCollapse(feedback: any) {
    feedback.collapsed = !feedback.collapsed;
  }
  async pegaId(id: any){
    (id);
    }
}
