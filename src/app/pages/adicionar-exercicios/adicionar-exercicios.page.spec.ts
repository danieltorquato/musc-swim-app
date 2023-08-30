import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarExerciciosPage } from './adicionar-exercicios.page';

describe('AdicionarExerciciosPage', () => {
  let component: AdicionarExerciciosPage;
  let fixture: ComponentFixture<AdicionarExerciciosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdicionarExerciciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
