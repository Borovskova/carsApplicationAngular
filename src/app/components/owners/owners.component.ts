import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, Owner, OwnersDataService } from 'src/app/services/owners-data.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {
  public ownerActive: any = {};
  public isBtnDisabled: boolean = true;
  public isNotificationVisible: boolean = false;
  public isAddFormVissible: boolean = false;
  public ownerForm: FormGroup;
  public carNumberUnregisterNotification: any;
  public isNumNotificationVisible: boolean = false;
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
    this.ownersDataService.getOwners()
  }


  public postNewOwner() {
    let newOwner = this.createNewOwner();
    this.ownersDataService.postNewOwnerData(newOwner)
      .subscribe(
        data => console.log('success' + data),
        (err: any) => {
          this.ownersDataService.newOwner = newOwner;
          this.ownersDataService.owners.push(newOwner)
          this.ownerForm.reset()
          this.isAddFormVissible = false;
          console.log('error ' + err);
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
        btn: btn
      }
    })
  }

  public removeOwner(owner: any) {
    let ownerForRemove = this.ownersDataService.owners.findIndex((item: any) => item.id == owner.id);
    this.ownersDataService.owners.splice(ownerForRemove, 1);
    this.isNotificationVisible = true;
  }

  public onNotificationOk() {
    this.isNotificationVisible = false;
  }
  public createNewOwner() {
    let newCarsList: any = [];
    let allOwnersData: any = [];
    let ownersName: any = [];
    let newCar: Car;
    let newOwner: Owner;

    allOwnersData.push(this.ownerForm.value);
    allOwnersData.forEach((item: any) => {
      newCar = {
        carNumber: item.carNumber, brandCar: item.brandCar, modelCar: item.modelCar, yearCar: item.yearCar
      }
      newCarsList.push(newCar)
      ownersName.push(item.lastName, item.firstName, item.middleName,)
    })
    newOwner = {
      id: this.ownersDataService.owners.length + 1, carsList: newCarsList, lastName: ownersName[0], firstName: ownersName[1], middleName: ownersName[2]
    };
    return newOwner;
  }
  public addNewOwner() {
    this.isAddFormVissible = true;
  }
  public ownerCarNumberValidator(control: any) {
    this.ownersDataService.owners.find((item: any) => {
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
