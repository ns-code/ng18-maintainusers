import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MyErrorStateMatcher, USER_STATUSES, UsersService } from '../service/users.service';
import { User } from '../data/user.data';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


@Component({
  standalone: true,
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css', './../users.component.css'],
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class UpdateUserComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  
  userStatuses = USER_STATUSES;
  errmsg = "";
  users$: Observable<User[]> | null = null;
  userId: bigint | null = null;
  userIdStr = '';
  toUpdateUser: User | null = null;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder) {

      this.form = this.formBuilder.group({
        "userName": new FormControl("", [Validators.required, Validators.minLength(3)]),
        "firstName": new FormControl("", [Validators.required, Validators.minLength(3)]),
        "lastName": new FormControl("", [Validators.required, Validators.minLength(3)]),
        "email": new FormControl("", [Validators.required, Validators.email]),
        "userStatus": new FormControl("I"),
        "department": new FormControl("")
      });

    this.route.params.subscribe({
      next: (params) => {
        this.userIdStr = params['id'];
        this.userId = BigInt(this.userIdStr.replace(':', ''));
        console.log(">> userId: ", this.userId);
        this.toUpdateUser = this.router.getCurrentNavigation()?.extras.state?.['toUpdateUser'];
        console.log(">> toUpdUser: ", this.toUpdateUser);
        this.form.setValue({
          userName: this.toUpdateUser?.userName!,
          firstName: this.toUpdateUser?.firstName!,
          lastName: this.toUpdateUser?.lastName!,
          email: this.toUpdateUser?.email!,
          userStatus: this.toUpdateUser?.userStatus!,
          department: this.toUpdateUser?.department!
        });
        this.form.controls['userName'].disable();
      }
    });
  }

  ngOnInit(): void {
    // Prepopulate the entire form
    this.form.get('userStatus')?.valueChanges.subscribe(value => {
      console.log(">> userStatus: ", value);
    });
  } 

  onUserFormUpdateSubmit(): boolean {
    console.log(">> e: ", this.form.valid, this.form.value);
    if (!this.form.valid) {
      this.errmsg = "Please enter valid field values.";
      return false;
    }
    
    this.toUpdateUser = new User(null, this.form.get("userName")?.value!, 
    this.form.get("firstName")?.value!,
    this.form.get("lastName")?.value!,
    this.form.get("email")?.value!,
    this.form.get("userStatus")?.value!,
    this.form.get("department")?.value!);

      this.usersService.updateUser(this.userId!, this.toUpdateUser!)?.subscribe({
        next: (res: User) => {
          // can be ignored
          console.log(">> user updated: ", res);
          this.router.navigate(['/users']);
        },
        error: (err: any) => {
          console.log(">> update user error: ", err);
        },
        complete: () => {}
      }); 

    return true;   

  }
}
