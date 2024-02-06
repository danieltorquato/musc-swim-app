import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { auth, db } from 'src/environments/environment';

@Component({
  selector: 'app-c-login',
  templateUrl: './c-login.component.html',
  styleUrls: ['./c-login.component.scss'],
})
export class CLoginComponent implements OnInit {
  db = db;
  loginForm: any = FormGroup;
  user: string = '';
  alertButtons: any;
  email: string = "";
  isModalOpen: boolean = false;
  constructor(public navCtrl: NavController,
    public formbuilder: FormBuilder,private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      emailReset: [null,[Validators.required, Validators.email]]
    });

    {
    }
  }

  userLogin() {
    signInWithEmailAndPassword(auth, this.loginForm.value.email,
      this.loginForm.value.password)
      .then((userCredential) => {
        // Signed in
        const userUid = userCredential.user.uid;
        console.log(userUid);
        this.navCtrl.navigateRoot(`/tabs/tab2`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  resertPassword(){
    sendPasswordResetEmail(auth, this.loginForm.value.emailReset)
        .then(() => {
          this.alertButtons = [

            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                this.isModalOpen = !this.isModalOpen;
                this.navCtrl.navigateRoot(`/login`);
              },
            },
          ];
          // Password reset email sent!
          // ..
          console.log('Enviado')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
