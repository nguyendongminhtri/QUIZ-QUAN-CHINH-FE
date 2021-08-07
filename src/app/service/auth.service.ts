import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {SignUpForm} from '../model/SignUpForm';
import {Observable} from 'rxjs';
import {SignInForm} from '../model/SignInForm';
import {JwtResponse} from '../model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //API SERVER
  private API_SIGNUP = environment.API_SERVER+'signup';
  private API_SIGNIN = environment.API_SERVER+'signin';
  private API_CHANGE_AVATAR = environment.API_SERVER + 'change-avatar';
  private API_CHANGE_PASSWORD = environment.API_SERVER+'change-password';
  private API_CHANGE_PROFILE = environment.API_SERVER+'change-profile';

  //API LOCAL
  // private API_SIGNUP = environment.API_LOCAL+'signup';
  // private API_SIGNIN = environment.API_LOCAL+'signin';
  // private API_CHANGE_AVATAR = environment.API_LOCAL + 'change-avatar';
  // private API_CHANGE_PASSWORD = environment.API_LOCAL+'change-password';
  // private API_CHANGE_PROFILE = environment.API_LOCAL+'change-profile';
  constructor(private http: HttpClient) { }
  signUp(signUp: SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP, signUp);
  }
  signIn(signIn: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_SIGNIN,signIn)
  }
  changeAvatar(info: any): Observable<JwtResponse> {
    return this.http.put<JwtResponse>(this.API_CHANGE_AVATAR ,info);
  }
  changePasswordAuth(info: any): Observable<JwtResponse> {
    console.log("info",info)
    return this.http.put<JwtResponse>(this.API_CHANGE_PASSWORD,info);
  }
  changeProfile(info: any): Observable<JwtResponse>{
    return this.http.put<JwtResponse>(this.API_CHANGE_PROFILE, info);
  }
}
