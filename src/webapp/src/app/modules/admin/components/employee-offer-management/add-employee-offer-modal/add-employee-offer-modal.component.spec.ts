import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeOfferModalComponent } from './add-employee-offer-modal.component';

describe('AddEmployeeOfferModalComponent', () => {
  let component: AddEmployeeOfferModalComponent;
  let fixture: ComponentFixture<AddEmployeeOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeeOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
