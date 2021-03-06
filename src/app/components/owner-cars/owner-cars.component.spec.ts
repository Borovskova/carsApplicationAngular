import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCarsComponent } from './owner-cars.component';

describe('OwnerCarsComponent', () => {
  let component: OwnerCarsComponent;
  let fixture: ComponentFixture<OwnerCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
