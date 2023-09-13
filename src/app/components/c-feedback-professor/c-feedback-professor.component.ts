import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-c-feedback-professor',
  templateUrl: './c-feedback-professor.component.html',
  styleUrls: ['./c-feedback-professor.component.scss'],
})
export class CFeedbackProfessorComponent  implements OnInit {
  uid: string = " ";
  id: string = "";
  data: any;
  dataArray: any[] = [];
  item: any;
  message: any;
  docRef: any;
  dataUser: any;
  docRefs: any;
  selectedRadio: string = '';
  function: Promise<void>| undefined;
  constructor(private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    if (this.selectedRadio == '') {
      this.selectedRadio = "exercise";
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

 async searchFeedbacks(tipo: any){
  this.dataArray = [];
  this.item = [];
    tipo = this.selectedRadio;
      const queryLa = collection(db, 'users', this.uid, 'feedbacks');
      const q = query(queryLa, where('answered', '==', 'Aguardando Resposta'), where('type', '==', this.selectedRadio));
      const queryL = await getDocs(q);
      queryL.forEach(async (docs) => {
        this.id = docs.id;
        this.dataArray.push(docs.data());
        console.log(this.dataArray);
        this.item = this.dataArray;
      });
                    }
  sendFeedbackExercise(){
this.item.forEach((docs: any)=>{
console.log(docs.data());

})
  }
  async openAlertExercise() {
    const alert = await this.alertController.create({
      header: 'Enviar Feedback',
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
            // Lógica para enviar o feedback ao professor
            console.log('Mensagem:', this.message);
            this.sendFeedbackExercise();
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
  sendFeedbackTraining(){
    this.item.forEach(async (docs: any)=>{
    console.log(docs.data());
    this.docRef = await addDoc(collection(db, 'users', this.item.pupil, 'feedbacks'), {
      professor: this.uid,
      answer: this.message,
      answered: 'Respondido',
      collapsed: false,
      createDate: '',
      img: this.item.img,
      name: this.item.name,
      shortName: this.item.shortName,
      text: this.message,
      type: 'training',
      read: 'Lido',
      idDoc: '',
      parcela: this.item.parcela,
    });
    await updateDoc(this.docRef, {
      idDoc: this.docRef.id,
    });
    this.docRefs = await addDoc(collection(db, 'users', this.uid, 'sendFeedbacks'), {
      answer: '',
      answered: 'Aguardando Resposta',
      collapsed: false,
      createDate: '',
      text: this.message,
      type: 'training',
      read: 'Não lido',
      idDoc: ''
    });
    console.log('Document written with ID: ', this.docRefs.id);
    await updateDoc(this.docRefs, {
      idDoc: this.docRefs.id
    });
    await updateDoc(this.docRef, {
      idDocPupil: this.docRefs.id,
    });
    })
      }
      async openAlertTraining() {
        const alert = await this.alertController.create({
          header: 'Enviar Feedback',
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
                // Lógica para enviar o feedback ao professor
                console.log('Mensagem:', this.message);
                this.sendFeedbackTraining();
                this.presentToastTraining('bottom');
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

    sendFeedback(type: string){
      switch (type) {
        case 'exercise':
          this.openAlertExercise();
          break;
        case 'training':
          this.openAlertTraining();
break;
        default:
          break;
      }
    }
}
