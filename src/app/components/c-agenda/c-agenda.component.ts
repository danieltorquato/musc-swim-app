import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged } from '@firebase/auth';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from 'src/environments/environment';

@Component({
  selector: 'app-c-agenda',
  templateUrl: './c-agenda.component.html',
  styleUrls: ['./c-agenda.component.scss'],
})
export class CAgendaComponent  implements OnInit {

  uid: any;
  hours: any[] = []
  timestamp = Date.now();
  today = new Date(this.timestamp)
  hourFormated = this.today.toISOString()
  tempo: any;
  constructor() { }
  ngOnInit() {
console.log(this.timestamp)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        this.searchNextHour()
      } else {
        alert('Você precisa estar logado');
      }
    });
  }
  async canDismiss( role?: string) {
    return role !== 'gesture';
  }
  searchNextHour(){
    const q = query(collection(db, "users", this.uid, "schedule"), where("situation", "==", "Agendado"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    this.hours = [];
    querySnapshot.forEach((doc) => {
        this.hours.push(doc.data());
      });
  });
  }
  Tempo(){
    console.log(this.tempo)

  }
}
