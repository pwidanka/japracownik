import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsDataComponent } from './application-details-data.component';

describe('ApplicationDetailsDataComponent', () => {
  let component: ApplicationDetailsDataComponent;
  let fixture: ComponentFixture<ApplicationDetailsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDetailsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDetailsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
