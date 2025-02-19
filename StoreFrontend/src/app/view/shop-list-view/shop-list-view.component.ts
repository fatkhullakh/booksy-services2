import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../api/shop/service/shop.service';
import { Shop } from '../../api/shop/model/shop';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router"; // ✅ Import this

@Component({
  selector: 'app-shop-list-view',
  standalone: true,
  imports: [CommonModule, RouterLink], // ✅ Add this line
  templateUrl: './shop-list-view.component.html',
  styleUrls: ['./shop-list-view.component.css'],
})
export class ShopListViewComponent implements OnInit {
  shops: Shop[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.fetchShops();
  }

  fetchShops() {
    this.shopService.getAllShops().subscribe({
      next: (data) => {
        this.shops = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load shops.';
        console.error(error);
      },
    });
  }

  deleteShop(shopId: string) {
    this.shopService.deleteShop(shopId).subscribe({
      next: () => {
        this.shops = this.shops.filter((s) => s.shopId !== shopId);
      },
      error: (error) => {
        this.errorMessage = 'Failed to delete shop.';
        console.error(error);
      },
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { ShopService } from '../../api/shop/service/shop.service';
// import { Shops } from '../../api/shop/model/shops';
// import { MatListModule } from '@angular/material/list';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { RouterLink } from '@angular/router';
// import { ViewTitleComponent } from '../../component/view-title/view-title.component';
//
// @Component({
//   selector: 'app-shop-list-view',
//   standalone: true,
//   imports: [
//     MatListModule,
//     MatDividerModule,
//     MatButtonModule,
//     RouterLink,
//     MatIconModule,
//     ViewTitleComponent,
//   ],
//   templateUrl: './shop-list-view.component.html',
//   styleUrl: './shop-list-view.component.css',
// })
// export class ShopListViewComponent implements OnInit {
//   constructor(private shopService: ShopService) {}
//
//   shops: Shops | undefined;
//   trackByShopId: any;
//
//   ngOnInit(): void {
//     this.fetchShops();
//   }
//
//   fetchShops(): void {
//     this.shopService.getAllShops().subscribe((shops) => {
//       this.shops = shops;
//     });
//   }
//
//   deleteShop(id: string): void {
//     this.shopService.deleteShop(id).subscribe(() => {
//       this.fetchShops();
//     });
//   }
// }
