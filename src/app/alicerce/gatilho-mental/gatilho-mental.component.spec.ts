import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatilhoMentalComponent } from './gatilho-mental.component';

describe('GatilhoMentalComponent', () => {
  let component: GatilhoMentalComponent;
  let fixture: ComponentFixture<GatilhoMentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatilhoMentalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatilhoMentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
