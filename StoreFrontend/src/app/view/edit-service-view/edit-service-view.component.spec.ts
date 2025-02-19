import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceViewComponent } from './edit-service-view.component';

describe('EditServiceViewComponent', () => {
  let component: EditServiceViewComponent;
  let fixture: ComponentFixture<EditServiceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiceViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditServiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
