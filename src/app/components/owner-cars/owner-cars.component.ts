import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Owner, OwnersDataService } from 'src/app/services/owners-data.service';



@Component({
  selector: 'app-owner-cars',
  templateUrl: './owner-cars.component.html',
  styleUrls: ['./owner-cars.component.scss']
})

export class OwnerCarsComponent implements OnInit {

  public carsForm: FormGroup;
  public owners: any = [];
  public id: any;
  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  public owner: any = {};
  public isAddFormVissible: boolean = false;
  public carNumberUnregisterNotification: any;
  public btnClicked: any;
  public isEditBtnsVissible: boolean = false;
  public isBtnSubmitDisabled: boolean = true;
  public isNumNotificationVisible: boolean = false;
  public registerOwnerNumber: any;
  public newOwner: any;




  constructor(private route: ActivatedRoute, private ownersDataService: OwnersDataService, private router: Router) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.btnClicked = queryParam.btn;
        this.newOwner = {
          id: queryParam.id, lastName: queryParam.lN, firstName: queryParam.fN, middleName: queryParam.mN,
          carsList: [
            { carNumber: queryParam.cN, brandCar: queryParam.bC, modelCar: queryParam.mC, yearCar: queryParam.yC }
          ]
        }
      }


    );

    this.carsForm = new FormGroup({

      "carNumber": new FormControl('', [Validators.required]),
      "brandCar": new FormControl('', Validators.required),
      "modelCar": new FormControl('', Validators.required),
      "yearCar": new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getOwnersInformation()
    this.btnClicked === 'edit-btn' ? this.isEditBtnsVissible = true : this.isEditBtnsVissible = false
  }

  public getOwnersInformation() {
    this.ownersDataService.getOwnersUrl()
      .subscribe(
        response => {
          let owners: Owner = response.carOwners;
          this.owners = owners;
          this.owners.push(this.newOwner)
          this.owner = this.owners.find((item: any) => item.id == this.id);
        },
        error => {
          console.log(error)
        }
      )
  }

  public submit() {
    this.owner.carsList.push(this.carsForm.value)
  }
  public goBack() {
    this.router.navigate(['owners']);
  }
  public add() {
    this.isAddFormVissible = true;
  }
  public remove(car: any) {
    let carRemove = this.owner.carsList.findIndex((item: any) => item.carNumber === car.carNumber);
    this.owner.carsList.splice(carRemove, 1)
  }

  public ownerCarNumberValidator(control: any) {
    this.owners.find((item: any) => {
      item.carsList.forEach((number: any) => {
        if (number.carNumber === control) {
          this.registerOwnerNumber = number.carNumber;
        }
      })
    })
    if (this.registerOwnerNumber === control) {
      this.carNumberUnregisterNotification = 'Автомобиль с таким номером уже зарегистрирован';
      this.isNumNotificationVisible = true;
      this.isBtnSubmitDisabled = true;
    } else {
      this.isBtnSubmitDisabled = false;
      this.isNumNotificationVisible = false;
    }
  }
}
