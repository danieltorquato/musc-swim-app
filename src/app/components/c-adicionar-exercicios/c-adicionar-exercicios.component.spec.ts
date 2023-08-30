import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CAdicionarExerciciosComponent } from './c-adicionar-exercicios.component';

describe('CAdicionarExerciciosComponent', () => {
  let component: CAdicionarExerciciosComponent;
  let fixture: ComponentFixture<CAdicionarExerciciosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CAdicionarExerciciosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CAdicionarExerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
