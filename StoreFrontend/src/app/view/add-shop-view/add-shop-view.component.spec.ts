import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopViewComponent } from './add-shop-view.component';

describe('AddShopViewComponent', () => {
  let component: AddShopViewComponent;
  let fixture: ComponentFixture<AddShopViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShopViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
