import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogToUpdateComponent } from './dialog-to-update.component';

describe('DialogToUpdateComponent', () => {
  let component: DialogToUpdateComponent;
  let fixture: ComponentFixture<DialogToUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogToUpdateComponent]
    });
    fixture = TestBed.createComponent(DialogToUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
