import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, getDocs, getDoc, addDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-c-treino-musc-aluno',
  templateUrl: './c-treino-musc-aluno.component.html',
  styleUrls: ['./c-treino-musc-aluno.component.scss'],
})
export class CTreinoMuscAlunoComponent implements OnInit {
  selectedRadio: string = '';
  trainingItems: any[] = [];
  id: any;
  trainingItemsId: any;
  uid: string = '';
  dataUser: any;
  docRef: any;
  message: any;
  nomeExercicio: any;
  docRefs: any;
  trust: any;
  url: any;
  dangerousVideoUrl: string = '';
  videoUrl: any;
  data = new Date();
  day = String(this.data.getDate());
  month = String(this.data.toLocaleString('pt-BR', { month: 'long' }));
  year = String(this.data.getFullYear());
  hour = String(this.data.getHours());
  minutes = String(this.data.getMinutes());
  horaAtual = `${this.hour}:${this.minutes}`;
  dataAtual = `${this.day}-${this.month}-${this.year}`;
  dateForm: any;
  list: any;
  listagem: void[] = [];
  auth = getAuth();
  items: any;
  docId: string = '';
typeTraining = true;
  public isRunning: boolean = false;
  public seconds: number = 0;
  public centiseconds: number = 0;
  private interval: any;
  public laps: { seconds: number; centiseconds: number }[] = [];
  public totalTime: number = 0;
  public lapCount: number = 0;
  public fastestLap: { seconds: number; centiseconds: number } | null = null;
  public averageTime: { seconds: number; centiseconds: number } | null = null;
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];
  constructor(private alertController: AlertController, private toastController: ToastController, private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.typeTraining = true;
    this.getData();
    this.getIdCard(this.nomeExercicio);
    if (this.day.length < 10) {
      this.day = String('0' + this.data.getDate()).slice(-2);
    }
  }

  async currentTraining() {
    if (this.selectedRadio == '') {
      this.selectedRadio = "A";
    }
    this.pegaRadio();
    this.trainingItems = [];
    const q = query(collection(db, 'users', `${this.uid}`, 'treino'), where("parcela", "==", this.selectedRadio));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.dangerousVideoUrl = doc.data()['video']
      console.log(this.dangerousVideoUrl);
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      doc.data()['video'] = this.videoUrl;
      console.log(doc.data()['video'])
      this.trainingItems.push(doc.data());

      this.trainingItemsId = doc.data()['id'];
      console.log(this.trainingItems);
    });
  }
  pegaRadio() {
    console.log(this.selectedRadio);
  }
  async sendFeedbackExercise() {
    this.docRef = await addDoc(collection(db, 'users', this.dataUser.professor, 'feedbacks'), {
      pupil: this.uid,
      idDocPupil: '',
      answer: '',
      answered: 'Aguardando Resposta',
      collapsed: false,
      createDate: '',
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      exercise: this.nomeExercicio,
      type: 'exercise',
      idDoc: '',
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
      exercise: this.nomeExercicio,
      type: 'exercise',
      idDoc: ''
    });
    console.log('Document written with ID: ', this.docRefs.id);
    await updateDoc(this.docRefs, {
      idDoc: this.docRefs.id
    });
    await updateDoc(this.docRef, {
      idDocPupil: this.docRefs.id,
    });
  }
  async abrirAlert(exercicio: any) {
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
            this.presentToast('bottom');
          },
        },
      ],
    });

    await alert.present();
  }
  async sendFeedbackTraining() {
    this.docRef = await addDoc(collection(db, 'users', this.dataUser.professor, 'feedbacks'), {
      pupil: this.uid,
      idDocPupil: '',
      answer: '',
      answered: 'Aguardando Resposta',
      collapsed: false,
      createDate: '',
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      type: 'training',
      read: 'Lido',
      idDoc: '',
      parcela: this.selectedRadio,
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
  }
  async openAlert() {
    const alert = await this.alertController.create({
      header: 'Deseja enviar um feedback do seu treino?',
      inputs: [
        {
          name: 'mensagem',
          type: 'textarea',
          placeholder: 'Digite sua mensagem',
        },
      ],
      buttons: [
        {
          text: 'Concluir',
          handler: async () => {

            this.registerTraining();
          }
        },
        {
          text: 'Enviar feedback',
          handler: async (data) => {
            this.message = data.mensagem;
            // Lógica para enviar o feedback ao professor
            console.log('Mensagem:', this.message);
            this.sendFeedbackTraining();
            this.registerTraining();
          },
        },
      ],
    });

    await alert.present();
  }
  async getData() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        const queryUser = await getDoc(doc(db, 'users', this.uid));
        // ...
        if (queryUser.exists()) {
          console.log('Document data:', queryUser.data());
          this.dataUser = queryUser.data();
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
        }
        this.currentTraining();

      } else {
        alert('Você precisa estar logado');
      }
    });

  }
  getIdCard(id: any) {
    this.nomeExercicio = id;
    console.log(id);
  }
  async presentToast(position: 'bottom') {
    const toast = await this.toastController.create({
      message: 'Feedback enviado!',
      duration: 1500,
      position: position,
    });
    await toast.present();
  }
  async registerTraining() {
    const docRef = addDoc(collection(db, 'history', this.uid, this.year), {
      day: this.day,
      month: this.month,
      year: this.year,
      musc: 1,
      swim: 0,
      hour: this.horaAtual,
    });
    this.docId = (await docRef).id;
    console.log(this.docId);
    const docRefT = setDoc(doc(db, 'users', this.uid, 'history', this.docId), {
      day: this.day,
      month: this.month,
      year: this.year,
      musc: 1,
      swim: 0,
      hour: this.horaAtual,
    });
    await this.registerTrainingAlert()
  }
  async registerTrainingAlert() {
    const alert = await this.alertController.create({
      header: 'Parabéns',
      subHeader: 'Treino Registrado',
      message: 'Consulte seu histórico',
      buttons: ['OK']
    });

    await alert.present();
  }
  async doneAlert() {
    const alert = await this.alertController.create({
      header: 'Parabéns',
      subHeader: 'Treino Registrado',
      message: 'Consulte seu histórico',
      buttons: ['OK']
    });

    await alert.present();
  }
  alterTraining(){
    this.typeTraining = !this.typeTraining
  }
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.centiseconds++;
        if (this.centiseconds == 100) {
          this.centiseconds = 0;
          this.seconds++;
        }
      }, 10);
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
      const lapTime = { seconds: this.seconds, centiseconds: this.centiseconds };
      this.laps.push(lapTime);
      this.lapCount++;
      this.totalTime += lapTime.seconds * 100 + lapTime.centiseconds;
      this.reset();
      this.calculateAverageTime();
    }
  }

  reset() {

      this.seconds = 0;
      this.centiseconds = 0;

  }
  async clear(){
this.presentAlert();
  }

  recordLap() {
    if (this.isRunning) {

      const lapTime = { seconds: this.seconds, centiseconds: this.centiseconds };
      this.laps.push(lapTime);
      this.reset();
      this.lapCount++;
      this.calculateAverageTime();
      if (
        this.fastestLap === null ||
        lapTime.seconds < this.fastestLap.seconds ||
        (lapTime.seconds === this.fastestLap.seconds && lapTime.centiseconds < this.fastestLap.centiseconds)
      ) {
        this.fastestLap = lapTime;
      }
    }
  }

  calculateAverageTime() {
    if (this.lapCount > 0) {
      const totalMilliseconds = this.laps.reduce(
        (sum, lap) => sum + lap.seconds * 1000 + lap.centiseconds * 10,
        0
      );
      const averageMilliseconds = totalMilliseconds / this.lapCount;

      const averageSeconds = Math.floor(averageMilliseconds / 1000);
      const averageCentiseconds = Math.floor(
        (averageMilliseconds - averageSeconds * 1000) / 10
      );

      this.averageTime = {
        seconds: averageSeconds,
        centiseconds: averageCentiseconds
      };
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({


      message: 'Certeza que deseja limpar todo o treino?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.laps = [];
          this.totalTime = 0;
          this.lapCount = 0;
          this.fastestLap = null;
          this.averageTime = null;
        },
      },],
    });

    await alert.present();
  }
}
