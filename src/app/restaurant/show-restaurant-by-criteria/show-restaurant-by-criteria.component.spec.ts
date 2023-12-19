import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRestaurantByCriteriaComponent } from './show-restaurant-by-criteria.component';

describe('ShowRestaurantByCriteriaComponent', () => {
  let component: ShowRestaurantByCriteriaComponent;
  let fixture: ComponentFixture<ShowRestaurantByCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRestaurantByCriteriaComponent]
    });
    fixture = TestBed.createComponent(ShowRestaurantByCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
