import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../api/service/service/service.service';
import { Shop } from '../../api/shop/model/shop';
import { Service } from '../../api/service/model/service';
import { ShopService } from '../../api/shop/service/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewTitleComponent } from '../../component/view-title/view-title.component';
import { ErrorMessageComponent } from '../../component/error-message/error-message.component';
import { ServiceFormComponent } from '../../component/service-form/service-form.component';

@Component({
  selector: 'app-edit-service-view',
  standalone: true,
  imports: [ViewTitleComponent, ErrorMessageComponent, ServiceFormComponent],
  templateUrl: './edit-service-view.component.html',
  styleUrl: './edit-service-view.component.css',
})
export class EditServiceViewComponent implements OnInit {
  constructor(
    private serviceService: ServiceService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  service: Service | undefined;
  shop: Shop | undefined;
  message: string = '';

  ngOnInit(): void {
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

  onSubmit(): void {
    this.message = '';
    if (this.service) {
      this.serviceService.updateService(this.service).subscribe({
        next: (service) => {
          this.router.navigate([
            '/shops',
            this.shop?.shopId,
            'services',
            service.serviceId,
          ]);
        },
        error: (error) => {
          this.message = error.error.message;
        },
      });
    }
  }
}
