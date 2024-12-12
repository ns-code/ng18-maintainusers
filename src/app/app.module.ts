import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [
    // ... other modules
    MatGridListModule, ReactiveFormsModule
  ],
  // ...
})
export class AppModule { }