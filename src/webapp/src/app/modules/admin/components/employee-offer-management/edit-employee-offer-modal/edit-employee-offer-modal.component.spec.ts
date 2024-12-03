import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeOfferModalComponent } from './edit-employee-offer-modal.component';

describe('EditEmployeeOfferModalComponent', () => {
  let component: EditEmployeeOfferModalComponent;
  let fixture: ComponentFixture<EditEmployeeOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEmployeeOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmployeeOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
