import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackProfessorPage } from './feedback-professor.page';

describe('FeedbackProfessorPage', () => {
  let component: FeedbackProfessorPage;
  let fixture: ComponentFixture<FeedbackProfessorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeedbackProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
