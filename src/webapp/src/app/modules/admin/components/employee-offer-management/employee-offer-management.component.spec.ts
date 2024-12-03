import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOfferManagementComponent } from './employee-offer-management.component';

describe('EmployeeOfferManagementComponent', () => {
  let component: EmployeeOfferManagementComponent;
  let fixture: ComponentFixture<EmployeeOfferManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeOfferManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeOfferManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
