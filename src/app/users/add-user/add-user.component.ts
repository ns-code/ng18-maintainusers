import { Component, OnInit, ViewChild } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { USER_STATUSES, UsersService } from '../service/users.service';
import { User } from '../data/user.data';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  standalone: true,
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./../users.component.css', './add-user.component.css'],
  imports: [CommonModule, UserFormComponent, FormsModule, ReactiveFormsModule, MatIconModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})export class AddUserComponent implements OnInit {
  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent | null = null;

  
  newUser: User | null = null;

  userStatuses = USER_STATUSES;
  errmsg = "";
  forActionVal = "Add";

  constructor(public usersService: UsersService, private router: Router) {}

  ngOnInit() {    
    this.errmsg = "";
  }

  captureSubmittedUser(e: User): void {
    this.newUser = e;
  }

  handleFormSubmission(e: any): boolean {
    this.usersService.createUser(this.newUser!)?.subscribe({
      next: (res: User) => {
        console.log(">> new user created: ", res);
        this.router.navigate(['/users']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(">> new user create error: ", err);
        if (err.status === 409) {
          this.errmsg = "User Name " + this.newUser?.userName + " already exists";
        }
        this.router.navigate(['/add-user']);
      },
      complete: () => { }
    }); 
    return true;  
  }
}
