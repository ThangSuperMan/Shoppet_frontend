import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaringPopupComponent } from './raring-popup.component';

describe('RaringPopupComponent', () => {
  let component: RaringPopupComponent;
  let fixture: ComponentFixture<RaringPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaringPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaringPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
