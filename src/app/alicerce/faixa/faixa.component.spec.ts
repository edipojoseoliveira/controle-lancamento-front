/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FaixaComponent } from './faixa.component';

describe('FaixaComponent', () => {
  let component: FaixaComponent;
  let fixture: ComponentFixture<FaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
