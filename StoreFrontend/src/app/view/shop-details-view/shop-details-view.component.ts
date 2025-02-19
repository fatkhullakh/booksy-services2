// import { Component, OnInit } from '@angular/core';
// import {ActivatedRoute, RouterLink} from '@angular/router';
// import { ShopService } from '../../api/shop/service/shop.service';
// import { Shop } from '../../api/shop/model/shop';
// import {ViewTitleComponent} from "../../component/view-title/view-title.component";
// import {MatCard, MatCardActions, MatCardHeader} from "@angular/material/card";
// import {MatList, MatListItem} from "@angular/material/list";
// import {MatIcon} from "@angular/material/icon";
// import {MatDivider} from "@angular/material/divider";
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { Services } from '../../api/service/model/services';
// import { ServiceService } from '../../api/service/service/service.service';
// import { ErrorMessageComponent } from '../../component/error-message/error-message.component';
//
// @Component({
//   selector: 'app-shop-details-view',
//   templateUrl: './shop-details-view.component.html',
//   standalone: true,
//   imports: [
//     ViewTitleComponent,
//     MatCard,
//     MatCardHeader,
//     MatCardActions,
//     MatList,
//     MatListItem,
//     RouterLink,
//     MatIcon,
//     MatDivider,
//     ErrorMessageComponent
//   ],
//   styleUrls: ['./shop-details-view.component.css']
// })
// export class ShopDetailsViewComponent implements OnInit {
//   shopId: string | null = null;
//   shop: Shop | null = null;
//   services: Services | null = null;
//   message: string = '';
//
//   constructor(private route: ActivatedRoute, private shopService: ShopService, private serviceService: ServiceService) {}
//
//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.shopId = params.get('id');  // <-- Get the ID from URL
//       console.log('Extracted shop ID:', this.shopId);
//
//       if (this.shopId) {
//         this.shopService.getShopById(this.shopId).subscribe({
//           next: (data) => this.shop = data,
//           error: (err) => console.error('Error fetching shop:', err)
//         });
//       }
//     });
//   }
//
//     fetchServices(): void {
//     if (this.shop) {
//       this.serviceService.getServicesByShopId(this.shop.shopId).subscribe({
//         next: (services: Services) => {
//           this.services = services;
//         },
//         error: (error) => {
//           this.message = error.error.message;
//         },
//       });
//     }
//   }
//
//   deleteService(id: string): void {
//     this.serviceService.deleteService(id).subscribe(() => {
//       this.fetchServices();
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../api/shop/service/shop.service';
import { Shop } from '../../api/shop/model/shop';
import { ActivatedRoute } from '@angular/router';
import { ViewTitleComponent } from '../../component/view-title/view-title.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Services } from '../../api/service/model/services';
import { ServiceService } from '../../api/service/service/service.service';
import { ErrorMessageComponent } from '../../component/error-message/error-message.component';

@Component({
  selector: 'app-shop-details-view',
  standalone: true,
  imports: [
    ViewTitleComponent,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatListModule,
    MatIconModule,
    ErrorMessageComponent,
  ],
  templateUrl: './shop-details-view.component.html',
  styleUrl: './shop-details-view.component.css',
})
export class ShopDetailsViewComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) {}

  message: string = '';
  shop: Shop | undefined;
  services: Services | undefined;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.shopService.getShopById(params['shopId']).subscribe({
        next: (shop: Shop) => {
          this.shop = shop;
          this.fetchServices();
        },
        error: (error) => {
          this.message = error.error.message;
        },
      });
    });
  }

  fetchServices(): void {
    if (this.shop) {
      this.serviceService.getServicesByShopId(this.shop.shopId).subscribe({
        next: (services: Services) => {
          this.services = services;
        },
        error: (error) => {
          this.message = error.error.message;
        },
      });
    }
  }

  deleteService(id: string): void {
    this.serviceService.deleteService(id).subscribe(() => {
      this.fetchServices();
    });
  }
}
