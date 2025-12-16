import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from '../../src/app/guards/auth-guard';
import { AuthService } from '../../src/app/services/auth';

describe('AuthGuard', () => {

  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('Debe permitir el acceso si el usuario está logeado', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    const result = guard.canActivate();

    // Sigue marcando como "errores" de tipo assertion

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('Debe bloquear el acceso y redirigir al login si el usuario no está logeado', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

});
