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
  //API LOCAL
  // private API_PAGE_USER = environment.API_LOCAL+'user';
  constructor(private http: HttpClient) { }
  pageUser(request){
    const params = request;
    return this.http.get(this.API_PAGE_USER, {params})
  }
  deleteUserById(id: number): Observable<UserAccount>{
    return this.http.delete<UserAccount>(`${this.API_PAGE_USER}/${id}`);
  }
}
