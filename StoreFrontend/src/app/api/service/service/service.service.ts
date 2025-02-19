import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Services } from '../model/services';
import { Observable } from 'rxjs';
import { Service } from '../model/service';
import {Shop} from "../../shop/model/shop";

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllServices(): Observable<Services> {
    return this.httpClient.get<Services>('/api/services');
  }

  getServiceById(id: string): Observable<Service> {
    return this.httpClient.get<Service>(`/api/services/${id}`);
  }

  getServicesByShopId(shopId: string): Observable<Services> {
    return this.httpClient.get<Services>(
      `/api/shops/${shopId}/services`,
    );
  }

  // createService(service: Service, shopId: string): Observable<Service> {
  //   return this.httpClient.post<Service>(`http://localhost:8081/api/shops/${shopId}/services`, service);
  // }
  //
  // createService(service: Service): Observable<Service> {
  //   return this.httpClient.post<Service>(`/api/shops/${shopId}`, service);
  // }


  createService(service: Service, shopId: string): Observable<Service> {
    return this.httpClient.post<Service>(
      `/api/shops/${shopId}/services`, service,
    );
  }

  updateService(service: Service): Observable<Service> {
    return this.httpClient.put<Service>(
      `/api/services/${service.serviceId}`,
      service,
    );
  }

  deleteService(id: string): Observable<void> {
    return this.httpClient.delete<void>(`/api/services/${id}`);
  }
}
