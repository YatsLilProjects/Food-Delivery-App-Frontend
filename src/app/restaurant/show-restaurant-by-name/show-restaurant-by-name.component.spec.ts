import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRestaurantByNameComponent } from './show-restaurant-by-name.component';

describe('ShowRestaurantByNameComponent', () => {
  let component: ShowRestaurantByNameComponent;
  let fixture: ComponentFixture<ShowRestaurantByNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRestaurantByNameComponent]
    });
    fixture = TestBed.createComponent(ShowRestaurantByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
