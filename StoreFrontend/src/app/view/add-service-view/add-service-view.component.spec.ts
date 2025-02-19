import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceViewComponent } from './add-service-view.component';

describe('AddServiceViewComponent', () => {
  let component: AddServiceViewComponent;
  let fixture: ComponentFixture<AddServiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServiceViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddServiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
