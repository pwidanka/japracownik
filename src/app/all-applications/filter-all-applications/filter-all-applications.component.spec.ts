import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAllApplicationsComponent } from './filter-all-applications.component';

describe('FilterAllApplicationsComponent', () => {
  let component: FilterAllApplicationsComponent;
  let fixture: ComponentFixture<FilterAllApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterAllApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAllApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
