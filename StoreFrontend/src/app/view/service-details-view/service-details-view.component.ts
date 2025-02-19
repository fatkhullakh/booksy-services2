import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../api/service/service/service.service';
import { Service } from '../../api/service/model/service';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../../api/shop/model/shop';
import { ShopService } from '../../api/shop/service/shop.service';
import { ViewTitleComponent } from '../../component/view-title/view-title.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageComponent } from '../../component/error-message/error-message.component';

@Component({
  selector: 'app-product-details-view',
  standalone: true,
  imports: [
    ViewTitleComponent,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    ErrorMessageComponent,
  ],
  templateUrl: './service-details-view.component.html',
  styleUrl: './service-details-view.component.css',
})
export class ServiceDetailsViewComponent implements OnInit {
  constructor(
    private serviceService: ServiceService,
    private shopService: ShopService,
    private route: ActivatedRoute
  ) {}

  message: string = '';
  shop: Shop | undefined;
  service: Service | undefined;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.serviceService.getServiceById(params['serviceId']).subscribe({
        next: (service) => {
          this.service = service;
        },
        error: (error) => {
          this.message = error.error.message;
        },
      });
      this.shopService.getShopById(params['shopId']).subscribe({
        next: (shop) => {
          this.shop = shop;
        },
        error: (error) => {
          this.message = error.error.message;
        },
      });
    });
  }
}
