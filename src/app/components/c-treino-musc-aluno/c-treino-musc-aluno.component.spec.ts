import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CTreinoMuscAlunoComponent } from './c-treino-musc-aluno.component';

describe('CTreinoMuscAlunoComponent', () => {
  let component: CTreinoMuscAlunoComponent;
  let fixture: ComponentFixture<CTreinoMuscAlunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CTreinoMuscAlunoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CTreinoMuscAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
