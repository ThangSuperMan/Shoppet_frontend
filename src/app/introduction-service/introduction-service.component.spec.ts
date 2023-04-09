import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionServiceComponent } from './introduction-service.component';

describe('IntroductionServiceComponent', () => {
  let component: IntroductionServiceComponent;
  let fixture: ComponentFixture<IntroductionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
