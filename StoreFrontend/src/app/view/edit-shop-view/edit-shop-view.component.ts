import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../api/shop/service/shop.service';
import { Shop } from '../../api/shop/model/shop';
import {ViewTitleComponent} from "../../component/view-title/view-title.component";
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-edit-shop-view',
  templateUrl: './edit-shop-view.component.html',
  styleUrls: ['./edit-shop-view.component.css'],
  imports: [
    CommonModule,
    ViewTitleComponent,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton
  ],
  standalone: true
})
export class EditShopViewComponent implements OnInit {
  shop: Shop | undefined;
  message: string = '';

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    console.log("Extracted shopId:", shopId); // Debugging output

    if (shopId) {
      this.shopService.getShopById(shopId).subscribe({
        next: (shop) => {
          this.shop = shop;
        },
        error: (error) => {
          this.message = error.error.message || 'Failed to load shop details';
        },
      });
    } else {
      this.message = "Invalid Shop ID";
    }
  }

  onSubmit(): void {
    if (!this.shop || !this.shop.shopId) {
      this.message = "Cannot update shop. Invalid ID.";
      return;
    }

    this.message = "";
    this.shopService.updateShop(this.shop.shopId, this.shop).subscribe({
      next: () => {
        this.router.navigate(['/shops']);
      },
      error: (error) => {
        this.message = error.error.message || "Failed to update shop";
      },
    });
  }
}
