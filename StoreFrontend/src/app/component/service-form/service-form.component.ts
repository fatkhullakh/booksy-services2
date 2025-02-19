import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Service } from '../../api/service/model/service';

@Component({
  selector: 'app-service-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css',
})
export class ServiceFormComponent {
  @Input() service: Service = {
    serviceId: '',
    name: '',
    price: 0,
    duration: 0,
    category: '',
  };
  @Output() submit = new EventEmitter<Service>();
  @Input() message: string = '';

  onSubmit(): void {
    if (this.service) {
      this.submit.emit(this.service);
    }
  }
}
