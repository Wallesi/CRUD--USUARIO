import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpleadosDashboardComponent } from './epleados-dashboard.component';

describe('EpleadosDashboardComponent', () => {
  let component: EpleadosDashboardComponent;
  let fixture: ComponentFixture<EpleadosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpleadosDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpleadosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
