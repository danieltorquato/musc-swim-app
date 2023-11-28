import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'alunos',
    loadChildren: () => import('./pages/alunos/alunos.module').then( m => m.AlunosPageModule)
  },
  {
    path: 'adicionar-exercicios/:info',
    loadChildren: () => import('./pages/adicionar-exercicios/adicionar-exercicios.module').then( m => m.AdicionarExerciciosPageModule)
  },
  {
    path: 'treino-musc-aluno',
    loadChildren: () => import('./pages/treino-musc-aluno/treino-musc-aluno.module').then( m => m.TreinoMuscAlunoPageModule)
  },
  {
    path: 'feedback-professor',
    loadChildren: () => import('./pages/feedback-professor/feedback-professor.module').then( m => m.FeedbackProfessorPageModule)
  },
  {
    path: 'treino-pisc-aluno',
    loadChildren: () => import('./pages/treino-pisc-aluno/treino-pisc-aluno.module').then( m => m.TreinoPiscAlunoPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./pages/historico/historico.module').then( m => m.HistoricoPageModule)
  },
  {
    path: 'feedback-alunos',
    loadChildren: () => import('./pages/feedback-alunos/feedback-alunos.module').then( m => m.FeedbackAlunosPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
