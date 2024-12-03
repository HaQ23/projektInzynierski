import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOfferListComponent } from './employee-offer-list.component';

describe('EmployeeOfferListComponent', () => {
  let component: EmployeeOfferListComponent;
  let fixture: ComponentFixture<EmployeeOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeOfferListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
