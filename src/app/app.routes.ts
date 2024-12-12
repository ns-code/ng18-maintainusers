import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

export const routes: Routes = [
  {path: 'add-user', component: AddUserComponent},
  {path: 'users/:id', component: UpdateUserComponent},
  {path: 'users', component: UsersComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'}
];
