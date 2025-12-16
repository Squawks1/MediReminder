import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiConnectPage } from './api-connect.page';

describe('ApiConnectPage', () => {
  let component: ApiConnectPage;
  let fixture: ComponentFixture<ApiConnectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiConnectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
