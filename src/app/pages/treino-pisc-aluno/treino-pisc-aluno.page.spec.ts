import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreinoPiscAlunoPage } from './treino-pisc-aluno.page';

describe('TreinoPiscAlunoPage', () => {
  let component: TreinoPiscAlunoPage;
  let fixture: ComponentFixture<TreinoPiscAlunoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TreinoPiscAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
