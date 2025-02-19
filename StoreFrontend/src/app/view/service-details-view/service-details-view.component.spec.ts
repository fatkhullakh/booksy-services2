import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsViewComponent } from './service-details-view.component';

describe('ServiceDetailsViewComponent', () => {
  let component: ServiceDetailsViewComponent;
  let fixture: ComponentFixture<ServiceDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetailsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
