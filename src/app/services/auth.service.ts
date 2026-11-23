import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { UserCredentials } from '../model/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
 private readonly loginUrl='http://localhost:8081/login'; private readonly tokenKey='jwt'; private readonly jwtHelper=new JwtHelperService();
 constructor(private http:HttpClient){}
 login(credentials:UserCredentials):Observable<HttpResponse<void>> { return this.http.post<void>(this.loginUrl,credentials,{observe:'response'}).pipe(tap(response=>{const token=response.headers.get('Authorization');if(token)localStorage.setItem(this.tokenKey,token.replace(/^Bearer\s+/i,''));})); }
 getToken():string|null{return localStorage.getItem(this.tokenKey);}
 isLoggedIn():boolean{return !!this.getToken()&&!this.jwtHelper.isTokenExpired(this.getToken()!);}
 getUsername():string{return this.decodeToken()?.sub??'';}
 isAdmin():boolean{return this.getRoles().includes('ADMIN');}
 getRoles():string[]{const roles=this.decodeToken()?.roles;return Array.isArray(roles)?roles:[];}
 logout():void{localStorage.removeItem(this.tokenKey);}
 private decodeToken():any{const token=this.getToken();if(!token||this.jwtHelper.isTokenExpired(token))return null;try{return this.jwtHelper.decodeToken(token);}catch{return null;}}
}
