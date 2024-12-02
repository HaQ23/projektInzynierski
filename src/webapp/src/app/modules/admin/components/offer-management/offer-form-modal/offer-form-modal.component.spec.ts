import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFormModalComponent } from './offer-form-modal.component';

describe('OfferFormModalComponent', () => {
  let component: OfferFormModalComponent;
  let fixture: ComponentFixture<OfferFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
