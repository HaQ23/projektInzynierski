import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteVisitModalComponent } from './confirm-delete-visit-modal.component';

describe('ConfirmDeleteVisitModalComponent', () => {
  let component: ConfirmDeleteVisitModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteVisitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteVisitModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteVisitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
