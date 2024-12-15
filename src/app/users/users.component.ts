import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { UsersService } from './service/users.service';
import { forkJoin, Observable } from 'rxjs';
import { User } from './data/user.data';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [CommonModule, RouterLink, MatGridListModule, MatButtonModule, FormsModule, ReactiveFormsModule]
})
export class UsersComponent implements OnInit {
  
  users: User[] = [];
  users$: Observable<User[]> | null = null;
  myForm: FormGroup;
  toDeleteIds = new Set<bigint>();
  deleteUserRes$: Observable<any>[] = [];

  constructor(private usersService: UsersService, private fb: FormBuilder,
                private router: Router) {    
    this.myForm = this.fb.group({
      selectedOptions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.usersService.getUsers();
  }

  onCheckboxChange(e: any, userId: bigint): void {
    this.toDeleteIds.add(userId);
  }

  deleteSelectedIds(): void {
    
    this.toDeleteIds.forEach(id => {
      this.deleteUserRes$.push(this.usersService.deleteUser(id));
      forkJoin(this.deleteUserRes$)
                     .subscribe({
                      next: (res) => {
                       // can be ignored
                       this.loadUsers();
                      },
                      complete: () => {}
                    });
    });
  }

  sendToUpdateUser(userId: bigint | null): void {
    this.users$?.subscribe({
      next: (users) => {
        users.forEach(user => {
          if (user.userId === userId) {
            this.router.navigate(['/users/:' + userId], { state: { toUpdateUser: user } });
          }  
        })
      }
    })
  }
}
