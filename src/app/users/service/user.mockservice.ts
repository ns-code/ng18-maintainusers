import { Observable, of } from 'rxjs';
import { User } from '../data/user.data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMockService {
  users: User[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
  ];
  
  getUsers() {
    return of(this.users);
  }

  createUser(newUser: User): Observable<User> | null {    
    newUser.id = 1;
    this.users.push(newUser);
    return of( newUser );
  } 

  updateUser(id: number, updatedUser: User): Observable<any> {    
    updatedUser.id = 1;
    this.users = this.users.map(u => {
      if (u.id === id) {
        return updatedUser;
      }
      return u;
    });
    return of();
  } 
  
  deleteUser(id: number): Observable<any> {   
    this.users = this.users.filter(u => u.id !== id);
    return of();
  }  
}