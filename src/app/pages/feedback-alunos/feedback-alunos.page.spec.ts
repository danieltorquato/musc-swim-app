import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackAlunosPage } from './feedback-alunos.page';

describe('FeedbackAlunosPage', () => {
  let component: FeedbackAlunosPage;
  let fixture: ComponentFixture<FeedbackAlunosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeedbackAlunosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
