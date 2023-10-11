import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CTreinoPiscAlunoComponent } from './c-treino-pisc-aluno.component';

describe('CTreinoPiscAlunoComponent', () => {
  let component: CTreinoPiscAlunoComponent;
  let fixture: ComponentFixture<CTreinoPiscAlunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CTreinoPiscAlunoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CTreinoPiscAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
