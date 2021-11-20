import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface Owner {
  id: string,
  lastName: string,
  firstName: string,
  middleName: string,
  carsList: []
}
export interface Car {
  carNumber: string,
  brandCar: string,
  modelCar: string,
  yearCar: string,
}
@Injectable({
  providedIn: 'root'
})

export class OwnersDataService {

  private url: any = "https://api.npoint.io/d36fcd2f41d44c8fb369";
  public owners: any = [];
  public newOwner: any = {};

  constructor(private http: HttpClient) { }


  public getOwnersUrl() {
    return this.http.get<any>(this.url);
  }
  public postNewOwnerData(owner: any) {
    const body = {
      lastName: owner.lastName, firstName: owner.firstName,
      middleName: owner.middleName, carsList: [
        {
          carNumber: owner.carsList[0].carNumber,
          brandCar: owner.carsList[0].brandCar,
          modelCar: owner.carsList[0].modelCar,
          yearCar: owner.carsList[0].yearCar
        }
      ]
    }
    return this.http.post<any>(this.url, body);
  }

  public getOwners() {
    this.getOwnersUrl()
      .subscribe(
        response => {
          let owners: Owner = response.carOwners;
          this.owners = owners;
          console.log(this.owners);
        },
        error => {
          console.log(error)
        }
      )
  }

}
