import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbusnoPage } from './dbusno.page';

describe('DbusnoPage', () => {
  let component: DbusnoPage;
  let fixture: ComponentFixture<DbusnoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbusnoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbusnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
