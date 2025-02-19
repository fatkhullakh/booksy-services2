import { Routes } from '@angular/router';
import { ShopListViewComponent } from './view/shop-list-view/shop-list-view.component';
import { AddShopViewComponent } from './view/add-shop-view/add-shop-view.component';
import { EditShopViewComponent } from './view/edit-shop-view/edit-shop-view.component';
import { ShopDetailsViewComponent } from './view/shop-details-view/shop-details-view.component';
import { ServiceDetailsViewComponent } from './view/service-details-view/service-details-view.component';
import { AddServiceViewComponent } from './view/add-service-view/add-service-view.component';
import { EditServiceViewComponent } from './view/edit-service-view/edit-service-view.component';

export const routes: Routes = [
  {
    component: ShopListViewComponent,
    path: 'shops',
  },
  {
    component: AddShopViewComponent,
    path: 'shops/new',
  },
  {
    component: ShopDetailsViewComponent,
    path: 'shops/:shopId',
  },
  {
    component: EditShopViewComponent,
    path: 'shops/:shopId/edit',
  },
  {
    component: AddServiceViewComponent,
    path: 'shops/:shopId/services/new',
  },
  {
    component: ServiceDetailsViewComponent,
    path: 'shops/:shopId/services/:serviceId',
  },
  {
    component: EditServiceViewComponent,
    path: 'shops/:shopId/services/:serviceId/edit',
  },
  {
    component: ShopListViewComponent,
    path: '**',
  },
];
