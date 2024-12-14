import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { MyErrorStateMatcher, USER_STATUSES, UsersService } from '../service/users.service';
import { User } from '../data/user.data';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./../users.component.css', './add-user.component.css'],
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, MatIconModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})export class AddUserComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  
  newUser: User | null = null;

  userStatuses = USER_STATUSES;
  errmsg = "";

  constructor(public usersService: UsersService, private router: Router,
    private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        "userName": new FormControl("", [Validators.required, Validators.minLength(3)]),
        "firstName": new FormControl("", [Validators.required, Validators.minLength(3)]),
        "lastName": new FormControl("", [Validators.required, Validators.minLength(3)]),
        "email": new FormControl("", [Validators.required, Validators.email]),
        "userStatus": new FormControl("I"),
        "department": new FormControl("")
      });
    } 

  ngOnInit() {
    this.errmsg = "";
    console.log(">> userStatuses: ", this.userStatuses);
    this.form.get('userStatus')?.valueChanges.subscribe(value => {
      console.log(">> userStatus: ", value);
    });
  }

  onUserFormSubmit(): boolean {
    if (!this.form.valid) {
      this.errmsg = "Please enter valid field values.";
      return false;
    }

    this.newUser = new User(null, this.form.get("userName")?.value!, 
    this.form.get("firstName")?.value!,
    this.form.get("lastName")?.value!,
    this.form.get("email")?.value!,
    this.form.get("userStatus")?.value!,
    this.form.get("department")?.value!);

    console.log(">> calling createUser for the user: ", this.newUser);

    this.usersService.createUser(this.newUser!)?.subscribe({
      next: (res: User) => {
        // can be ignored
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
