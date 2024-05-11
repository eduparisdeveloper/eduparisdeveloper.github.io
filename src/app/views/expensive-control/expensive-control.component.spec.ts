import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensiveControlComponent } from './expensive-control.component';

describe('ExpensiveControlComponent', () => {
  let component: ExpensiveControlComponent;
  let fixture: ComponentFixture<ExpensiveControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensiveControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensiveControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
