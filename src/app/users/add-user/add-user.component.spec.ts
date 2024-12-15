import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AddUserComponent } from './add-user.component';
import { UsersService } from '../service/users.service';
import { UserMockService } from '../service/user.mockservice';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../data/user.data';

describe('AddUserComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent, AddUserComponent, RouterModule.forRoot([])],
      providers: [ provideHttpClient(), provideHttpClientTesting(),
        { provide: UsersService, useClass: UserMockService }
       ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddUserComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display error for User Name conflict', async () => {
    const fixture1 = TestBed.createComponent(UserFormComponent);
    const userFormCompInst = fixture1.componentInstance;

    const fixture = TestBed.createComponent(AddUserComponent);
    const addCompInst = fixture.componentInstance;
     
    addCompInst.ngOnInit();
    
    userFormCompInst.onUserFormSubmit();

    const capturedUser: User = {
      userId: null,
      userName: "user1",
      firstName: "fn2",
      lastName: "ln2",
      email: "user2@test.com",
      userStatus: "I",
      department: ""
    };

    addCompInst.captureSubmittedUser(capturedUser);
    addCompInst.handleFormSubmission(null);  
    expect(addCompInst.errmsg).toContain("already exists");
  });
});
