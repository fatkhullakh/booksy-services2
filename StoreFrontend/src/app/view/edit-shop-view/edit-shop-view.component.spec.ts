import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShopViewComponent } from './edit-shop-view.component';

describe('EditShopViewComponent', () => {
  let component: EditShopViewComponent;
  let fixture: ComponentFixture<EditShopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditShopViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
