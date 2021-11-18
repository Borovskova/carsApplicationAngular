import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner, OwnersDataService } from 'src/app/services/owners-data.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  public owners: any = [];
  public ownerActive: any = {};
  public isBtnDisabled: boolean = true;
  public isNotificationVisible: boolean = false;
  public isAddFormVissible: boolean = false;
  public ownerForm: FormGroup;
  public carNumberUnregisterNotification: any;
  public isNumNotificationVisible:boolean = false;
  public registerOwnerNumber: any;
  public isBtnSubmitDisabled: boolean = true;


  constructor(public ownersDataService: OwnersDataService, public router: Router, private activateRoute: ActivatedRoute) {
    this.ownerForm = new FormGroup({
      "lastName": new FormControl('', [Validators.required]),
      "firstName": new FormControl('', [Validators.required]),
      "middleName": new FormControl('', [Validators.required]),
      "carNumber": new FormControl('', [Validators.required]),
      "brandCar": new FormControl('', Validators.required),
      "modelCar": new FormControl('', Validators.required),
      "yearCar": new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getOwners()

  }

  public getOwners() {
    this.ownersDataService.getOwnersUrl()
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
  public onRowClick(owner: any) {
    this.ownerActive = owner;
    this.isBtnDisabled = false;
  }
  public onInfoButtonClick(owner: any, btn: string) {
    this.router.navigate(['/owners-information', owner.id], {
      queryParams: {
        btn: btn,
        id: owner.id, lN: owner.lastName, fN: owner.firstName, mN: owner.middleName, cN: owner.carsList[0].carNumber,
        bC: owner.carsList[0].brandCar, mC: owner.carsList[0].modelCar, yC: owner.carsList[0].modelCar
      }
    })
  }

  public removeOwner(owner: any) {
    let ownerForRemove = this.owners.findIndex((item: any) => item.id == owner.id);
    this.owners.splice(ownerForRemove, 1);
    this.isNotificationVisible = true;
  }

  public onNotificationOk() {
    this.isNotificationVisible = false;
  }
  public submit() {
    let newCarsList: any = [];
    let allOwnersData: any = [];
    let ownersName: any = [];
    let newCar;
    let newOwner

    allOwnersData.push(this.ownerForm.value);
    allOwnersData.forEach((item: any) => {
      newCar = {
        carNumber: item.carNumber, brandCar: item.brandCar, modelCar: item.modelCar, yearCar: item.yearCar
      }
      newCarsList.push(newCar)
      ownersName.push(item.lastName, item.firstName, item.middleName,)
    })
    newOwner = {
      id: this.owners.length + 1, carsList: newCarsList, lastName: ownersName[0], firstName: ownersName[1], middleName: ownersName[2]
    };
    this.owners.push(newOwner)
    this.isAddFormVissible = false;
  }
  public addNewOwner() {
    this.isAddFormVissible = true;
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
