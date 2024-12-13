import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  updateUser(userId: number, updatedUser: User): Observable<User> {
    const url = `/users/${userId}`;
    return this.http.put<User>(this.API_BASE_URL + url, updatedUser);
  }   

  deleteUser(userId: number): Observable<any> {
    const url = `/users/${userId}`;
    return this.http.delete<any>(this.API_BASE_URL + url);
  }  
}

export enum UserStatuses {
  I = "I", A = "A", T = "T"
}
