import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerCarsComponent } from './components/owner-cars/owner-cars.component';
import { OwnersComponent } from './components/owners/owners.component';

const routes: Routes = [
  { path: '', redirectTo: 'owners', pathMatch: 'full' },
  { path: 'owners', component: OwnersComponent },
  { path: 'owners-information/:id', component: OwnerCarsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
