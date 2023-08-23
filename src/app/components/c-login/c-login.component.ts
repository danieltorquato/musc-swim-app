import { db } from './../../environment/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-c-login',
  templateUrl: './c-login.component.html',
  styleUrls: ['./c-login.component.scss'],
})
export class CLoginComponent implements OnInit {
  db = db;
  loginForm: any = FormGroup;
  user: string = '';
  constructor(public navCtrl: NavController,
    public formbuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

    {
    }
  }

  userLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.loginForm.value.email,
      this.loginForm.value.password)
      .then((userCredential) => {
        // Signed in
        const userUid = userCredential.user.uid;
        console.log(userUid);
        this.navCtrl.navigateRoot(`/tabs/tab2/${userUid}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  teste() {
    console.log('tsg');
  }
}
