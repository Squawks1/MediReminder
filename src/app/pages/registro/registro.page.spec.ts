import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/services/api';

const sqliteMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve({}))
};

const platformMock = {
  ready: () => Promise.resolve(),
  backButton: {
    subscribeWithPriority: jasmine.createSpy('subscribeWithPriority')
  }
};


const toastControllerMock = {
  create: jasmine.createSpy('create').and.returnValue(
    Promise.resolve({ present: () => {} })
  )
};

const apiServiceMock = {
  get: jasmine.createSpy('get'),
  post: jasmine.createSpy('post'),
  login: jasmine.createSpy('login')
};

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SQLite, useValue: sqliteMock },
        { provide: Platform, useValue: platformMock },
        { provide: ToastController, useValue: toastControllerMock },
        { provide: ApiService, useValue: apiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
