import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shop } from '../../api/shop/model/shop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-shop-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './shop-form.component.html',
  styleUrl: './shop-form.component.css',
})
export class ShopFormComponent {
  @Input() shop: Shop = {
    shopId: '',
    name: '',
    location: '',
    phoneNumber: '',
    email: '',
    ownerName: '',
    rating: 0,
  };
  @Output() submit = new EventEmitter<Shop>();
  @Input() message: string = '';

  onSubmit(): void {
    if (this.shop) {
      this.submit.emit(this.shop);
    }
  }
}
