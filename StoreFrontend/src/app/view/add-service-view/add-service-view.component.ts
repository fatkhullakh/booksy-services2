import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../api/shop/service/shop.service';
import { ServiceService } from '../../api/service/service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewTitleComponent } from '../../component/view-title/view-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from '../../component/error-message/error-message.component';
import { Service } from '../../api/service/model/service';
import { Shop } from '../../api/shop/model/shop';
import { ServiceFormComponent } from '../../component/service-form/service-form.component';

@Component({
  selector: 'app-add-service-view',
  standalone: true,
  imports: [
    ViewTitleComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ErrorMessageComponent,
    ServiceFormComponent,
  ],
  templateUrl: './add-service-view.component.html',
  styleUrl: './add-service-view.component.css',
})
export class AddServiceViewComponent implements OnInit {
  constructor(
    private shopService: ShopService,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  message: string = '';
  shop: Shop | undefined;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const shopId = params['shopId'];
      console.log('Extracted shopId:', shopId);  // ✅ Debugging line

      if (!shopId) {
        this.message = 'Shop ID is missing!';
        return;
      }

      this.shopService.getShopById(shopId).subscribe({
        next: (shop) => {
          this.shop = shop;
        },
        error: (error) => {
          this.message = error.error.message || 'Failed to fetch shop!';
        },
      });
    });
  }


  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.shopService.getShopById(params['shopId']).subscribe({
  //       next: (shop) => {
  //         this.shop = shop;
  //       },
  //       error: (error) => {
  //         this.message = error.error.message;
  //       },
  //     });
  //   });
  // }

  onSubmit(service: Service): void {
    this.message = '';
    if (!this.shop) {
      return;
    }
    this.serviceService.createService(service, this.shop.shopId).subscribe({
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
