import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Exercicio } from '../models/exercicios.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciciosService {

  constructor(private firestore: AngularFirestore) { }

  // Adicionar exercício
  adicionarExercicio(exercicio: Exercicio): Promise<void> {
    const id = this.firestore.createId();
    exercicio.id = id;
    return this.firestore.doc(`exercicios/${id}`).set(exercicio);
  }

  // Obter exercícios
  obterExercicios(): Observable<Exercicio[]> {
    return this.firestore.collection<Exercicio>('exercicios').valueChanges();
  }

  // Atualizar exercício
  atualizarExercicio(exercicio: Exercicio): Promise<void> {
    const id = exercicio.id;
    return this.firestore.doc(`exercicios/${id}`).update(exercicio);
  }

  // Excluir exercício
  excluirExercicio(id: string): Promise<void> {
    return this.firestore.doc(`exercicios/${id}`).delete();
  }
}
