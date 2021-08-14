import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {UserAccount} from '../model/UserAccount';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //API SERVER
  private API_PAGE_USER = environment.API_SERVER+'user';
  private API_CHANGE_ROLE = this.API_PAGE_USER+'/change/role';
  //API LOCAL
  // private API_PAGE_USER = environment.API_LOCAL+'user';
  // private API_CHANGE_ROLE = this.API_PAGE_USER+'/change/role'
  constructor(private http: HttpClient) { }
  pageUser(request){
    const params = request;
    return this.http.get(this.API_PAGE_USER, {params})
  }
  deleteUserById(id: number): Observable<UserAccount>{
    return this.http.delete<UserAccount>(`${this.API_PAGE_USER}/${id}`);
  }
  getUserById(id: number): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.API_PAGE_USER}/${id}`);
  }
  changeRoleUser(id: number, value: any): Observable<any> {
    return this.http.put<any>(`${this.API_CHANGE_ROLE}/${id}`, value);
  }
}
