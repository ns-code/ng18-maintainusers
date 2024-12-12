import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../data/user.data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_BASE_URL = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> | null {
    return this.http.get<User[]>(this.API_BASE_URL + '/users');
  }

  createUser(newUser: User): Observable<User> | null {
    return this.http.post<User>(this.API_BASE_URL + '/users', newUser);
  }   

  updateUser(id: number, updatedUser: User): Observable<User> {
    const url = `/users/${id}`;
    return this.http.put<User>(this.API_BASE_URL + url, updatedUser);
  }   

  deleteUser(id: number): Observable<any> {
    const url = `/users/${id}`;
    return this.http.delete<any>(this.API_BASE_URL + url);
  }  
}
