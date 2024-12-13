import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AddUserComponent } from './add-user.component';
import { UsersService } from '../service/users.service';
import { UserMockService } from '../service/user.mockservice';

describe('AddUserComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent, RouterModule.forRoot([])],
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
    const fixture = TestBed.createComponent(AddUserComponent);
    const addCompInst = fixture.componentInstance;

    addCompInst.onUserFormSubmit();  
    addCompInst.ngOnInit();
    addCompInst.form.setValue({
      userName: "user1",
      firstName: "fn2",
      lastName: "ln2",
      email: "user2@test.com",
      userStatus: "I",
      department: ""
    });
    addCompInst.onUserFormSubmit();  
    expect(addCompInst.errmsg).toContain("already exists");
  });
});
