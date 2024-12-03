import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesReservationModalComponent } from './services-reservation-modal.component';

describe('ServicesReservationModalComponent', () => {
  let component: ServicesReservationModalComponent;
  let fixture: ComponentFixture<ServicesReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesReservationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
