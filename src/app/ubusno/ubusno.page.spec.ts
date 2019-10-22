import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbusnoPage } from './ubusno.page';

describe('UbusnoPage', () => {
  let component: UbusnoPage;
  let fixture: ComponentFixture<UbusnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbusnoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbusnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
