import { Component } from '@angular/core';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { UsersService } from '../service/users.service';
import { User } from '../data/user.data';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./../users.component.css', './add-user.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class AddUserComponent {
  name = new FormControl('');

  constructor(private usersService: UsersService, private router: Router) {} 

  addUser(e: any): void {
    console.log('e: ', this.name.value);
    const newUser = new User(null, this.name.value!);
    this.usersService.createUser(newUser)?.subscribe({
      next: (res: User) => {
        // can be ignored
        console.log(">> new user created: ", res);
        this.router.navigate(['/users']);
      },
      error: (err: any) => {
        console.log(">> new user create error: ", err);
      },
      complete: () => {}
    });    
  }
}
