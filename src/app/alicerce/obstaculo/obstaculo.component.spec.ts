import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObstaculoComponent } from './obstaculo.component';

describe('ObstaculoComponent', () => {
  let component: ObstaculoComponent;
  let fixture: ComponentFixture<ObstaculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObstaculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObstaculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
