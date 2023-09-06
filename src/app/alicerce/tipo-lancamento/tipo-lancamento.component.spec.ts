/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipoLancamentoComponent } from './tipo-lancamento.component';

describe('TipoLancamentoComponent', () => {
  let component: TipoLancamentoComponent;
  let fixture: ComponentFixture<TipoLancamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoLancamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
