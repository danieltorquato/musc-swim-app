import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, IonModal, NavController, ToastController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, collection, where, getDocs, getDoc, addDoc, doc, updateDoc, setDoc, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { db } from 'src/environments/environment';
import { register } from 'swiper/element';
register();
@Component({
  selector: 'app-c-treino-musc-aluno',
  templateUrl: './c-treino-musc-aluno.component.html',
  styleUrls: ['./c-treino-musc-aluno.component.scss'],
})
export class CTreinoMuscAlunoComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal | any;

  selectedRadio: string = '';
  numberReps: any;
  numberKg: any;
  editInfo: boolean = false;
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
  timestamp = Date.now();
  horaFormatada = `${('0' + this.data.getHours()).slice(-2)}:${('0' + this.data.getMinutes()).slice(-2)}`;
  dataFormatada = `${('0' + this.data.getDate()).slice(-2)}/${('0' + (this.data.getMonth() + 1)).slice(-2)}/${this.data.getFullYear().toString().slice(-2)}`;
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
clickedIndexes = new Set<number>();
  public isRunning: boolean = false;
  public seconds: number = 0;
  public centiseconds: number = 0;
  private interval: any;
  public laps: { lapIndex: number;seconds: number; centiseconds: number }[] = [];
  public totalTime: number = 0;
  public lapCount: number = 0;
  public fastestLap: { seconds: number; centiseconds: number } | null = null;
  public averageTime: { seconds: number; centiseconds: number } | null = null;

  isModalOpen = false;
  trainingSwimItems: any[] = [];
  trainingSwimItemsId: any;
  trainingItemsReps: any;
  activeTraining: any | undefined | null;
  idDocTraining: any;
  selectedSegment: string = '';
  parcelItems: any[] = [];
  lastParcel: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        ('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        ('Alert confirmed');
      },
    },
  ];
  constructor(private alertController: AlertController, private toastController: ToastController, private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public formbuilder: FormBuilder) { }

  ngOnInit() {
    this.getData();
    this.getIdCard(this.nomeExercicio);
    if (this.day.length < 10) {
      this.day = String('0' + this.data.getDate()).slice(-2);
    }
  }
  async getData() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        const queryUser = await getDoc(doc(db, 'users', this.uid));
        if (queryUser.exists()) {
          this.dataUser = queryUser.data();
          const q = query(collection(db, "history", this.uid, this.year), orderBy("timestamp", "desc"), limit(1));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            switch (doc.data()['parcela']) {
              case 'A':
                this.selectedSegment = 'B'

                break;
              case 'B':
                this.selectedSegment = 'C'
                break;
              case 'C':
                this.selectedSegment = 'A'
                break;

              default:
                break;
            }
          });


        } else {
          // docSnap.data() will be undefined in this case
          ('No such document!');
        }
        this.getParcel();

        this.currentTraining(this.selectedSegment);


      } else {
        alert('Você precisa estar logado');
      }
    });

  }
  async currentTraining(selectedSegment: any) {


this.trainingItems = []
    const q = query(collection(db, 'users', `${this.uid}`, 'treino'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const q = query (collection(db, 'users', `${this.uid}`, 'treino', doc.id, 'exercícios'), where("parcela", "==", selectedSegment));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.trainingItems.push(doc.data());
        this.activeTraining = doc.data()['idTraining'];
        this.idDocTraining = doc.data()['idDoc'];
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
        doc.data()['video'] = this.videoUrl;

        this.trainingItemsId = doc.data()['id'];
        this.trainingItemsReps = doc.data()['repeticoes'];

      })

    });



  }
 async getParcel(){

    console.log(this.uid);

      const q = query (collection(db, 'users', this.uid, 'treino'))
      const unsubscribe = onSnapshot(q, (querySnapshots) => {
        this.parcelItems = [];
        querySnapshots.forEach((doc) => {
                 this.parcelItems.push(doc.data());

        });
    });
    }
  async sendFeedbackExercise() {
    this.docRef = await addDoc(collection(db, 'users', this.dataUser.professor, 'feedbacks'), {
      pupil: this.uid,
      idDocPupil: '',
      answer: '',
      answered: 'Aguardando Resposta',
      answerDate: '',
      answerHour: '',
      answerTimestamp: 0,
      collapsed: false,
      createDate: this.dataFormatada,
      createHour: this.horaFormatada,
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      exercise: this.nomeExercicio,
      read: false,
      type: 'Exercício',
      idDoc: '',
      timestamp: this.timestamp
    });
    await updateDoc(this.docRef, {
      idDoc: this.docRef.id,
    });
    this.docRefs = await addDoc(collection(db, 'users', this.uid, 'sendFeedbacks'), {
      answer: '',
      answered: 'Aguardando Resposta',
      answerDate: '',
      answerHour: '',
      answerTimestamp: 0,
      collapsed: false,
      createDate: this.dataFormatada,
      createHour: this.horaFormatada,
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      exercise: this.nomeExercicio,
      type: 'Exercício',
      idDoc: '',
      timestamp: this.timestamp,
      read: false
    });
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
      createDate: this.dataFormatada,
      createHour: this.horaFormatada,
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      type: 'Treino',
      read: 'Lido',
      idDoc: '',
      parcela: this.selectedRadio,
      timestamp: this.timestamp

    });
    await updateDoc(this.docRef, {
      idDoc: this.docRef.id,
      idDocPupil: this.docRef.id

    });
    this.docRefs = await setDoc(doc(db, 'users', this.uid, 'sendFeedbacks', this.docRef.id), {
      answer: '',
      answered: 'Aguardando Resposta',
      collapsed: false,
      createDate: this.dataFormatada,
      createHour: this.horaFormatada,
      img: this.dataUser.img,
      name: this.dataUser.name,
      shortName: this.dataUser.shortName,
      text: this.message,
      type: 'Treino',
      read: 'Não lido',
      idDoc: '',
      idDocPupil: '',
      timestamp: this.timestamp,
      parcela: this.selectedRadio,

    });
    await updateDoc(doc(db, 'users', this.uid, 'sendFeedbacks', this.docRef.id), {
      idDoc: this.docRef.id,
      idDocPupil: this.docRef.id
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
            this.sendFeedbackTraining();
            this.registerTraining();
          },
        },
      ],
    });

    await alert.present();
  }


  getIdCard(id: any) {
    this.nomeExercicio = id;

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
      parcela: this.selectedSegment,
      timestamp: this.timestamp,

    });
    this.docId = (await docRef).id;
    const docRefT = setDoc(doc(db, 'users', this.uid, 'history', this.docId), {
      day: this.day,
      month: this.month,
      year: this.year,
      musc: 1,
      swim: 0,
      hour: this.horaAtual,
      parcela: this.selectedSegment,
      timestamp: this.timestamp,

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

  async editData(id:any, idTraining: any){
    const q = query (collection(db, 'users', this.uid, 'treino',  idTraining, 'exercícios'), where("parcela", "==", this.selectedSegment));

    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      this.trainingItems = [];
      querySnapshots.forEach((doc) => {
               this.trainingItems.push(doc.data());

      });

    });

const editRef = doc(db, "users", this.uid, 'treino', idTraining, 'exercícios', id );

await updateDoc(editRef, {
  edit: true
});

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
      const lapTime = {   lapIndex: this.lapCount, // Adicionando o índice da volta
      seconds: this.seconds,
      centiseconds: this.centiseconds };
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

      const lapTime = {   lapIndex: this.lapCount, // Adicionando o índice da volta
      seconds: this.seconds,
      centiseconds: this.centiseconds };
      this.laps.push(lapTime);

      (this.laps)
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
    }else {
      this.averageTime = null; // Se não houver voltas restantes, o tempo médio é null
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({


      message: 'Certeza que deseja limpar todo o treino?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          ('Alert canceled');
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

  async alterData(idTraining: any, idDoc: any){
  const editRef = doc(db, "users", this.uid, 'treino', idTraining, 'exercícios', idDoc);

await updateDoc(editRef, {
  peso: this.numberKg,
  edit: false
});
const q = query (collection(db, 'users', this.uid, 'treino',  idTraining, 'exercícios'), where("parcela", "==", this.selectedRadio));

    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      this.trainingItems = [];
      querySnapshots.forEach((doc) => {
               this.trainingItems.push(doc.data());

      });

    });

    this.numberKg = '';

}
reloadTraining(idTraining: any){
  const q = query (collection(db, 'users', this.uid, 'treino',  idTraining, 'exercícios'), where("parcela", "==", this.selectedSegment));

    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      this.trainingItems = [];
      querySnapshots.forEach((doc) => {
               this.trainingItems.push(doc.data());

      });
});
}

}
