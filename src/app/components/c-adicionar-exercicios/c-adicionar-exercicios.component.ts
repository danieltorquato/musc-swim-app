import { Exercicio } from './../../models/exercicios.model';
import { OverlayEventDetail } from '@ionic/core/components';
import { InfiniteScrollCustomEvent, IonModal, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { addDoc, collection, doc, setDoc, getDocs, QuerySnapshot, query, where, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ExerciciosService } from 'src/app/services/exercicios.service';

@Component({
  selector: 'app-c-adicionar-exercicios',
  templateUrl: './c-adicionar-exercicios.component.html',
  styleUrls: ['./c-adicionar-exercicios.component.scss'],
})
export class CAdicionarExerciciosComponent  implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  exercicio: Exercicio = { nome: '', descricao: '', categoria: '' };
  str = undefined;
  items:any[] = [];
  filterItems: any[] = [];
  name: any;
  searchTerm = '';
  searchCategory = '';
  isModalOpen: boolean | undefined;
 id:  string | null='';
 pupilsItem: any[] = [];
 trainingItems: any[] = [];
//  component = PupilsComponent;
  uid: string = '';
exerciseName: any;
exerciseCategory: any;
exerciseVariation: any;
exerciseWeight: any;
exerciseObservation: any;
  docRef: any;
  idExercise: any;
  trainingItemsId: any;
  videoExercise: string = "";
  selectedRadio: string = '';
  numberReps: number | undefined;
  trainingItemsReps: number | undefined;
  htmlSnippet: string = "<script>safeCode()</script>";
  constructor(private exerciciosService: ExerciciosService, private activatedRoute: ActivatedRoute, private navCtrl: NavController) { }

  ngOnInit() {
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.uid = user.uid;
      this.usePupil();
      this.currentTraining();
      this.pegaRadio();
      this.pegaReps();
    } else {
      alert('Você precisa estar logado');
    }
  });
  }

  async usePupil(){
    this.id = this.activatedRoute.snapshot.paramMap.get('info');
    const querySnapshot = await doc(db, 'users', `${this.id}`);
    const docSnap = await getDoc(querySnapshot);
    if (docSnap.exists()) {
      this.pupilsItem.push(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async currentTraining(){
    if (this.selectedRadio == '') {
this.selectedRadio = "A";
    }

    this.pegaRadio();
    this.trainingItems = [];
    const q = query (collection(db, 'users', `${this.id}`, 'treino'), where("parcela", "==", this.selectedRadio));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.trainingItems.push(doc.data());
      this.trainingItemsId = doc.data()['id'];
      this.trainingItemsReps = doc.data()['repeticoes'];
      console.log(this.trainingItems);
      console.log(this.trainingItemsReps);
      console.log(this.trainingItemsId);
    });

  }
  async buscarDados(){
    const querySnapshot = await getDocs(collection(db, 'exercicios'));
    this.items = [];
    this.videoExercise = "";
    querySnapshot.forEach((doc) => {
      this.filterItems = [];
      this.items.push(doc.data());
      this.filterItems = this.items;
      this.exerciseName = doc.data()['nome'];
      this.exerciseVariation = doc.data()['variacao'];
      this.idExercise = doc.data()['id'];
      this.videoExercise = doc.data()['video'];
    });
    console.log(this.items);

}
emptyList(){
  this.items=[];
}
  addExercise() {
    this.exerciciosService.adicionarExercicio(this.exercicio)
      .then(async () => {
        console.log('Exercício adicionado com sucesso!');
        // faça algo após adicionar o exercício, se necessário
        // const docRef = await addDoc(collection(db, 'exercicios'), {
        //   nome: this.exercicio.nome,
        //   descricao: this.exercicio.descricao,
        //   categoria: this.exercicio.categoria
        // });
      })
      .catch(error => console.error('Erro ao adicionar exercício:', error));
  }
  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen = false;
    this.currentTraining();
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.addExercise();
    }
  }
  filterExercises() {
    this.videoExercise = "";
    this.searchCategory = '';
    if(this.searchTerm.length === 0){
      this.emptyList();
      this.filterItems = [];
          }
    // Filtrar os exercícios com base no termo de pesquisa
    this.filterItems = this.items.filter(item =>
      item.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    }
  async filterExercisesCategory() {
    this.videoExercise = "";
    if(this.searchCategory.length === 0){
      this.emptyList();
this.filterItems = [];
    }
    const queryCategory = query(collection(db, "exercicios"), where("categoria", "==" , this.searchCategory));
    const querySnapshot = await getDocs(queryCategory);
  this.emptyList();
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      this.items.push(doc.data());
      this.idExercise = doc.data()['id'];
      this.videoExercise = doc.data()['video'];
      this.filterItems = this.items.filter(item =>
        item.categoria.toLowerCase().includes(this.searchCategory.toLowerCase())
      );
    });

    }
   async addExerciseInTraining(nome: any, variacao: string, id: any){
    this.idExercise = id;
    this.exerciseVariation = variacao;
    if(!variacao){
      variacao = " ";
    }
    this.docRef = await setDoc(doc(db, `users/${this.id}/treino`, this.idExercise, ),{

      nome: nome,
      variacao: variacao,
      peso: null,
      observacao: '',
      repeticoes: this.trainingItemsReps,
      parcela: this.selectedRadio,
      id: this.idExercise,
      video:  this.videoExercise
    });
    const docRefPupil = await setDoc(doc(db, `users/${this.id}/treino`, this.idExercise), {
      nome: nome,
      variacao: variacao,
      peso: null,
      observacao: '',
      repeticoes: this.trainingItemsReps,
      parcela: this.selectedRadio,
      id: this.idExercise,
      video: this.videoExercise
    });
console.log('feito');
  }
  async updateDataExercise(id: any, repeticoes: number | undefined){
    try {
      // Referência ao documento específico que deseja atualizar
      const docRef = doc(db, `users/${this.id}/treino`, id);

      // Dados que você deseja atualizar (neste caso, apenas as repetições)
      const dataToUpdate = { repeticoes: repeticoes };

      // Executa o update no documento com os novos dados
      await updateDoc(docRef, dataToUpdate);

      console.log('Atualização bem-sucedida!');
    } catch (error) {
      console.error('Erro ao atualizar o documento:', error);
    }
  }
    pegaId(id: any){
    }
    pegaRadio(){
console.log(this.selectedRadio);
    }
    pegaReps(){
      console.log(this.numberReps);
    }
}
