import { Component } from '@angular/core';
import { ViewTitleComponent } from '../../component/view-title/view-title.component';
import { ShopService } from '../../api/shop/service/shop.service';
import { Shop } from '../../api/shop/model/shop';
import { ErrorMessageComponent } from '../../component/error-message/error-message.component';
import { Router } from '@angular/router';
import { ShopFormComponent } from '../../component/shop-form/shop-form.component';

@Component({
  selector: 'app-add-shop-view',
  standalone: true,
  imports: [ViewTitleComponent, ErrorMessageComponent, ShopFormComponent],
  templateUrl: './add-shop-view.component.html',
  styleUrl: './add-shop-view.component.css',
})
export class AddShopViewComponent {
  constructor(
    private shopService: ShopService,
    private router: Router
  ) {}

  message: string = '';

  // onSubmit(shop: Shop): void {
  //   this.message = '';
  //   this.shopService.createShop(shop).subscribe({
  //     next: (shop: Shop) => {
  //       this.router.navigate(['/shops', shop.shopId]);
  //     },
  //     error: (error) => {
  //       this.message = error.error.message;
  //     },
  //   });
  // }

  onSubmit(shop: Shop): void {
    this.shopService.createShop(shop).subscribe({
      next: (response) => {
        console.log('Shop added successfully:', response);
        this.router.navigate(['/shops']); // Redirect to shop list
      },
      error: (error) => {
        console.error('Error adding shop:', error);
      },
    });
  }

}
