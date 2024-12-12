import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { UsersService } from '../service/users.service';
import { User } from '../data/user.data';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css', './../users.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class UpdateUserComponent implements OnInit {
  name = new FormControl('');
  users$: Observable<User[]> | null = null;
  userId: number | null = null;
  userIdStr = '';
  updatedUser = { name: '' };

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe({
      next: (params) => {
        this.userIdStr = params['id'];
        this.userId = Number(this.userIdStr.replace(':', ''));
        console.log(">> userId: ", this.userId);
        this.updatedUser = this.router.getCurrentNavigation()?.extras.state?.['updatedUser'];
        this.name.setValue(this.updatedUser.name);
      }
    });
  }

  ngOnInit(): void {
    
  } 

  updateUser(e: any): void {
    console.log('e: ', this.name.value);
    const updUsr = new User(this.userId, this.name.value!);
    this.usersService.updateUser(this.userId!, updUsr)?.subscribe({
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
