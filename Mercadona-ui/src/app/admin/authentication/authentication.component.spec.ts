import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';


describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let authService: AuthenticationService;
  let authenticateSpy: jasmine.Spy;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        AuthenticationService,
        { provide: JwtHelperService, useValue: { decodeToken: () => {} } },
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }  },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    authenticateSpy = spyOn(authService, 'authenticate').and.returnValue(of({ token: '' }));
    router = TestBed.inject(Router);
  });

  it('should call authenticate method when onSubmit is called', () => {
    component.user.login = 'john';
    component.user.password = 'password';
    component.onSubmit();
    expect(authenticateSpy).toHaveBeenCalledWith(component.user);
  });
});
