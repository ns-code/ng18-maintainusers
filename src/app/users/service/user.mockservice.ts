import { Observable, of, throwError } from 'rxjs';
import { User } from '../data/user.data';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserMockService {
  users: User[] = [
    { userId: 1, userName: 'user1', firstName: "fn1", lastName: "ln1", email: "e1@test.com", userStatus: "I", department: "" },
    { userId: 2, userName: 'user2', firstName: "fn2", lastName: "ln2", email: "e2@test.com", userStatus: "A", department: "" }
];
  
  getUsers() {
    return of(this.users);
  }

  createUser(newUser: User): Observable<User> | null {    
    newUser.userId = this.users.length + 1;
    const existingUsers = this.users.map(u => u.userName);
    if (existingUsers.includes(newUser.userName)) {
      const mockErrorResponse = new HttpErrorResponse({
        status: 409
      });
      console.log(">> throwing error");      
      return throwError(() => mockErrorResponse);
    } else {
      this.users.push(newUser);
      return of( newUser );
    }
  } 

  updateUser(id: number, updatedUser: User): Observable<any> {    
    updatedUser.userId = 1;
    this.users = this.users.map(u => {
      if (u.userId === id) {
        return updatedUser;
      }
      return u;
    });
    return of();
  } 
  
  deleteUser(id: number): Observable<any> {   
    this.users = this.users.filter(u => u.userId !== id);
    return of();
  }  
}