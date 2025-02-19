import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../model/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private apiUrl = 'http://localhost:8080/api/shops'; // Adjust if needed

  constructor(private http: HttpClient) {}

  // Fetch all shops
  getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiUrl);
  }

  // Delete a shop by ID
  deleteShop(shopId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${shopId}`);
  }

  getShopById(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiUrl}/${shopId}`);
  }

  createShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>('/api/shops', shop);
  }

  // updateShop(shop: Shop): Observable<Shop> {
  //   return this.http.put<Shop>(
  //     `/api/shops/${shop.shopId}`,
  //     shop,
  //   );
  // }

  updateShop(shopId: string, shop: Shop): Observable<Shop> {
    return this.http.put<Shop>(`${this.apiUrl}/${shopId}`, shop);
  }


}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import {catchError, Observable, throwError} from 'rxjs';
// import { Shops } from '../model/shops';
// import { Shop } from '../model/shop';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class ShopService {
//   constructor(private httpClient: HttpClient) {}
//
//   private apiUrl = 'http://localhost:8080/api/shops'; // Use backend API port
//
//   getAllShops(): Observable<Shops> {
//     return this.httpClient.get<Shops>('/api/shops');
//   }
//
//   getShopById(shopId: string): Observable<Shop> {
//     return this.httpClient.get<Shop>(`${this.apiUrl}/${shopId}`);
//   }
//
//   createShop(shop: Shop): Observable<Shop> {
//     return this.httpClient.post<Shop>('/api/shops', shop);
//   }
//
//   updateShop(shop: Shop): Observable<Shop> {
//     return this.httpClient.put<Shop>(
//       `/api/shops/${shop.shopId}`,
//       shop,
//     );
//   }
//
//   deleteShop(id: string): Observable<void> {
//     return this.httpClient.delete<void>(`/api/shops/${id}`);
//   }
// }
