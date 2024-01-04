import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc, setDoc, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-c-feedback-professor',
  templateUrl: './c-feedback-professor.component.html',
  styleUrls: ['./c-feedback-professor.component.scss'],
})
export class CFeedbackProfessorComponent  implements OnInit {
  uid: string = " ";
  id: string = "";
  data = new Date();
  timestamp = Date.now();
  horaFormatada = `${('0' + this.data.getHours()).slice(-2)}:${('0' + this.data.getMinutes()).slice(-2)}`;
  dataFormatada = `${('0' + this.data.getDate()).slice(-2)}/${('0' + (this.data.getMonth() + 1)).slice(-2)}/${this.data.getFullYear().toString().slice(-2)}`;
  dataArray: any[] = [];
  item: any[] = [];
  message: any;
  docRef: any;
  dataUser: any;
  docRefs: any;
  selectedRadio: string = '';
  function: Promise<void>| undefined;
  idDoc: any;
  docRefsF: any;
  docRefPupil: any;
  idPupil: any;
  constructor(private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    if (this.selectedRadio == '') {
      this.selectedRadio = "Exercício";
    }
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {

        this.uid = user.uid;
        console.log("Usuário logado: " + this.uid)
        this.searchFeedbacks(this.selectedRadio);
      } else {
        alert('Você precisa estar logado');
      }
    });
  }

 async searchFeedbacks(type: any){
  const q = query(collection(db, "users", this.uid, "feedbacks"), where("type", "==", type));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    this.item = [];
    querySnapshot.forEach((doc) => {
     this.idPupil = doc.data()['pupil']
        this.item.push(doc.data());
    });
  });

                    }
  async sendFeedbackExercise(docId: any){

    const alert = await this.alertController.create({
      header: 'Feedback de exercício',
      inputs: [
        {
          name: 'mensagem',
          type: 'textarea',
          placeholder: 'Digite sua mensagem',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            this.message = data.mensagem;
            const docRef = doc(db, "users", this.uid, 'feedbacks', docId);

            await updateDoc(docRef, {
              answered: 'Respondido',
              answer: data.mensagem,
              answerDate: this.dataFormatada,
              answerHour: this.horaFormatada,
              answerTimestamp: this.timestamp
            });
            const docRefPupil = doc(db, "users", this.idPupil, 'sendFeedbacks', docId);
            await updateDoc(docRefPupil, {
              answered: 'Respondido',
              answer: data.mensagem,
              answerDate: this.dataFormatada,
              answerHour: this.horaFormatada,
              answerTimestamp: this.timestamp
            });
            this.presentToastExercise('bottom');
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToastExercise(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Feedback de exercício enviado!',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }

  async sendFeedbackTraining(docId: any){

        const alert = await this.alertController.create({
          header: 'Feedback de treino',
          inputs: [
            {
              name: 'mensagem',
              type: 'textarea',
              placeholder: 'Digite sua mensagem',
            },
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Enviar',
              handler: async (data) => {


                this.message = data.mensagem;
                console.log('Mensagem:', this.message);
                this.presentToastTraining('bottom');

const docRef = doc(db, "users", this.uid, 'feedbacks', docId);

await updateDoc(docRef, {
  answered: 'Respondido',
  answer: data.mensagem,
  answerDate: this.dataFormatada,
  answerHour: this.horaFormatada,
  answerTimestamp: this.timestamp
});
const docRefPupil = doc(db, "users", this.idPupil, 'sendFeedbacks', docId);
await updateDoc(docRefPupil, {
  answered: 'Respondido',
  answer: data.mensagem,
  answerDate: this.dataFormatada,
  answerHour: this.horaFormatada,
  answerTimestamp: this.timestamp
});
              },
            },
          ],
        });

        await alert.present();
      }

      async presentToastTraining(position: 'bottom') {
        const toast = await this.toastController.create({
          message: 'Feedback de treino enviado!',
          duration: 1500,
          position: position,
        });
        await toast.present();
      }

  async pegaId(id: any){
    console.log(id);
    }


}
