import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordatoriosPage } from './recordatorios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/services/api';
import { of } from 'rxjs';

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
  getPosts: jasmine.createSpy('getPosts').and.returnValue(of([])),
  get: jasmine.createSpy('get').and.returnValue(of({})),
  post: jasmine.createSpy('post').and.returnValue(of({})),
  login: jasmine.createSpy('login').and.returnValue(of({}))
};

describe('RecordatoriosPage', () => {
  let component: RecordatoriosPage;
  let fixture: ComponentFixture<RecordatoriosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordatoriosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SQLite, useValue: sqliteMock },
        { provide: Platform, useValue: platformMock },
        { provide: ToastController, useValue: toastControllerMock },
        { provide: ApiService, useValue: apiServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecordatoriosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
