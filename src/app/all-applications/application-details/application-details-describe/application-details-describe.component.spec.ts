import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsDescribeComponent } from './application-details-describe.component';

describe('ApplicationDetailsDescribeComponent', () => {
  let component: ApplicationDetailsDescribeComponent;
  let fixture: ComponentFixture<ApplicationDetailsDescribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationDetailsDescribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDetailsDescribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
