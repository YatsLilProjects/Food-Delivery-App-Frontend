import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../model/Response';
import { Restaurant } from '../model/Restaurant';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  public restaurantsData: Restaurant[] = [];
  public selectedMenuItem: string|null;
  public selectedRestaurant: Restaurant;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  addRestaurant(restaurant: Restaurant): Observable<Response> {
    return this.http.post<Response>(`${this.baseUrl}/addRestaurant`, restaurant);
  }

  viewAllRestaurants(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/viewAllRestaurants`);
  }

  viewAllCuisineTypes(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/viewAllCuisineTypes`);
  }

  deleteRestaurant(restaurantId: number): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/deleteRestaurant/${restaurantId}`);
  }

  updateRestaurant(restaurantData: Restaurant): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/updateRestaurant`, restaurantData);
  }

  findRestaurantByCuisineTypeAndLocation(cuisineType: string, restaurantLocation: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/restaurantByCuisineType/${cuisineType}/AndLocation/${restaurantLocation}`);
  }

  findRestaurantsByLocation(restaurantLocation: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/restaurantByLocation/${restaurantLocation}`);
  }

  findRestaurantsByCriteria(
    cuisineType: string | null,
    restaurantLocation: string | null,
    restaurantName: string | null
  ): Observable<Response> {
    const baseUrl = `${this.baseUrl}/restaurantsByCriteria`;
    let queryParams = '';
    if (cuisineType !== null) {
      if (queryParams !== '') {
        queryParams += '&';
      }
      queryParams += `cuisineType=${encodeURIComponent(cuisineType)}`;
    }
    if (restaurantLocation !== null) {
      if (queryParams !== '') {
        queryParams += '&';
      }
      queryParams += `restaurantLocation=${encodeURIComponent(restaurantLocation)}`;
    }
    if (restaurantName !== null) {
      if (queryParams !== '') {
        queryParams += '&';
      }
      queryParams += `restaurantName=${encodeURIComponent(restaurantName)}`;
    }
    const url = `${baseUrl}?${queryParams}`;

    return this.http.get<Response>(url);
  }

  findRestaurantsByMenuItemName(itemName: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/restaurantsByMenuItemName/${itemName}`);
  }

  searchRestaurants(searchTerm: string): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/searchRestaurants/${searchTerm}`);
  }

  getRestaurantsByPages(pageNumber: number, pageSize: number, sortColumn: string, sortOrder: string): Observable<Response> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortOrder', sortOrder);
    return this.http.get<Response>(`${this.baseUrl}/getRestaurantsByPages`, { params });
  }

  countTotalNoOfRestaurants():Observable<Response>
  {
    return this.http.get<Response>(`${this.baseUrl}/noOfRestaurants`);
  }

  getRestaurantById(restaurantId:number):Observable<Response>
  {
    const params = new HttpParams().set('restaurantId',restaurantId)
    return this.http.get<Response>(`${this.baseUrl}/viewRestaurantById`,{ params });
  }
  
  viewAllTopBrands():Observable<Response>{
    return this.http.get<Response>(`${this.baseUrl}/viewAllTopBrands`);
  }

  getRestaurantByName(restaurantName:string):Observable<Response>{
    const params = new HttpParams().set('restaurantName',restaurantName)
    return this.http.get<Response>(`${this.baseUrl}/getRestaurantByName`,{ params });
  }

  findByMenuItemNameAndRestaurantName(menuItemName:string,restaurantName:string):Observable<Response>{
    const params = new HttpParams()
    .set('menuItemName',menuItemName)
    .set('restaurantName',restaurantName)
    return this.http.get<Response>(`${this.baseUrl}/searchMenuItem`,{ params });
  }
  
}






