import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { USER_STATUSES, UsersService } from '../service/users.service';
import { User } from '../data/user.data';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  standalone: true,
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css', './../users.component.css'],
  imports: [CommonModule, UserFormComponent, FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class UpdateUserComponent implements OnInit {
  @ViewChild(UserFormComponent) userFormComponent: UserFormComponent | null = null;
  
  userStatuses = USER_STATUSES;
  errmsg = "";
  users$: Observable<User[]> | null = null;
  userId: bigint | null = null;
  userIdStr = '';
  userToUpdate: User | undefined;

  constructor(private usersService: UsersService, private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe({
      next: (params) => {
        this.userIdStr = params['id'];
        this.userId = BigInt(this.userIdStr.replace(':', ''));
        console.log(">> userId: ", this.userId);
        this.userToUpdate = this.router.getCurrentNavigation()?.extras.state?.['toUpdateUser'];
      }
    });

  }

  ngOnInit(): void {
  } 

  ngAfterViewInit() {
    this.userFormComponent?.form.controls['userName'].disable();
  }

  captureSubmittedUser(e: User): void {
    console.log(">> captured e: ", e);
    this.userToUpdate = e;
  }

  handleFormSubmission(e: any): boolean {
      this.usersService.updateUser(this.userId!, this.userToUpdate!)?.subscribe({
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
