import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-c-personal-info',
  templateUrl: './c-personal-info.component.html',
  styleUrls: ['./c-personal-info.component.scss'],
})
export class CPersonalInfoComponent  implements OnInit {
  id: string | null | undefined;
  data: any[] = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('info');
this.getData()
  }
  async getData(){
  const docRef = doc(db, "users", `${this.id}`);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  this.data.push(docSnap.data());
  console.log(this.data)
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

}
}
