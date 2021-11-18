import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Owner {
  id: string,
  lastName: string,
  firstName: string,
  middleName: string,
  carsQuantity: string,
  carsList: []
}
@Injectable({
  providedIn: 'root'
})

export class OwnersDataService {

  private url:any = "https://api.npoint.io/d36fcd2f41d44c8fb369";
  
  constructor(private http: HttpClient) { }


  getOwnersUrl() {
    return this.http.get<any>(this.url);
  }
}
