import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneradorFichas } from './generador-fichas';

describe('GeneradorFichas', () => {
  let component: GeneradorFichas;
  let fixture: ComponentFixture<GeneradorFichas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneradorFichas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneradorFichas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
