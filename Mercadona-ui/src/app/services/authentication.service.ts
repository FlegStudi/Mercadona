import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';

export interface AuthenticatedResponse
{
  token: string;
}

@Injectable(
  {
    providedIn: 'root'
  })

export class AuthenticationService
{
  apiUrl:string = environment.apiUrl +"login";
  constructor(private http : HttpClient,private router : Router, private jwtHelper: JwtHelperService) { }

  authenticate(user:any)
  {
    return this.http.post<AuthenticatedResponse>(this.apiUrl, user, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    })
  }

  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate([""]);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token))
    {
      return true;
    }
    this.router.navigate([""]);
    return false;
  }
}
