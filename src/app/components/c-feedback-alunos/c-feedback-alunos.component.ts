import { db } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, onSnapshot } from 'firebase/firestore';

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
  constructor() { }

  ngOnInit() {
    this.carregarFeedbacks();
  }
  async carregarFeedbacks() {
    onAuthStateChanged(this.auth, async (user: any) => {

      this.uid = user.uid;
      const q = await query(collection(db, 'users', this.uid, 'feedbackPupil'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.feedbacks = [];
        querySnapshot.forEach((doc)=>{

          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
          this.feedbacks.push(doc.data());

          this.dataDoc = doc.data();
          console.log(this.dataDoc);

        });
      });
    });
  }
  toggleCollapse(feedback: any) {
    feedback.collapsed = !feedback.collapsed;
  }
}
