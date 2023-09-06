/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PrincipioComponent } from './principio.component';

describe('PrincipioComponent', () => {
  let component: PrincipioComponent;
  let fixture: ComponentFixture<PrincipioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
