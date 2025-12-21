import { TestBed } from '@angular/core/testing';
import { Dbservice } from './dbservice';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';

const sqliteMock = {
  create: jasmine.createSpy('create').and.returnValue(
    Promise.resolve({})
  )
};

const platformMock = {
  ready: () => Promise.resolve()
};

const toastControllerMock = {
  create: jasmine.createSpy('create').and.returnValue(
    Promise.resolve({
      present: jasmine.createSpy('present')
    })
  )
};

describe('Dbservice', () => {
  let service: Dbservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Dbservice,
        { provide: SQLite, useValue: sqliteMock },
        { provide: Platform, useValue: platformMock },
        { provide: ToastController, useValue: toastControllerMock }
      ]
    });

    service = TestBed.inject(Dbservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
