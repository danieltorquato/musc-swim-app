import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreinoMuscAlunoPage } from './treino-musc-aluno.page';

describe('TreinoMuscAlunoPage', () => {
  let component: TreinoMuscAlunoPage;
  let fixture: ComponentFixture<TreinoMuscAlunoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TreinoMuscAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
