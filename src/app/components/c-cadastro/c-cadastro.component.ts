import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'src/app/environment/environment';

@Component({
  selector: 'app-c-cadastro',
  templateUrl: './c-cadastro.component.html',
  styleUrls: ['./c-cadastro.component.scss'],
})
export class CCadastroComponent  implements OnInit {
  db = db;
  registerForm: any = FormGroup;
  user: string = '';
  constructor(public navCtrl: NavController,
    public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

    {
    }
  }

userRegister(){
  const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.registerForm.value.email,
      this.registerForm.value.password)
    .then(async (userCredential) => {
      // Signed in
      const userUid = userCredential.user.uid;
      console.log(userUid)
      await setDoc(doc(this.db, 'users/' + userUid), {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        id: userUid,
        img: '',
        shortName: '',
        isAdmin:false,
        isProfessor:false,
        telephone: '',
        professor: '',
    });
    this.navCtrl.navigateRoot(`/login`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}
}
