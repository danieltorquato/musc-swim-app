import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CFeedbackAlunosComponent } from './c-feedback-alunos.component';

describe('CFeedbackAlunosComponent', () => {
  let component: CFeedbackAlunosComponent;
  let fixture: ComponentFixture<CFeedbackAlunosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CFeedbackAlunosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CFeedbackAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
