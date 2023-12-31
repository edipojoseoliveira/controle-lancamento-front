/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NichoComponent } from './nicho.component';

describe('NichoComponent', () => {
  let component: NichoComponent;
  let fixture: ComponentFixture<NichoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NichoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NichoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
