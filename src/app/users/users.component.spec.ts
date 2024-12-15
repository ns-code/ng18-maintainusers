import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserMockService } from './service/user.mockservice';
import { UsersService } from './service/users.service';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

describe('UsersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, RouterModule.forRoot([])],
      providers: [ provideHttpClient(), provideHttpClientTesting(),
        { provide: UsersService, useClass: UserMockService }
       ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load the users', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;

    const userService = TestBed.inject(UsersService);
    spyOn(userService, 'getUsers').and.callThrough();
  
    component.ngOnInit(); 
  
    // expect(userService.getUsers).toHaveBeenCalled(); 
 
    
    component.users$ = userService.getUsers();

    component.users$?.subscribe(value => {
      expect(value).toEqual([
        { userId: 1n, userName: 'user1', firstName: "fn1", lastName: "ln1", email: "e1@test.com", userStatus: "I", department: "" },
        { userId: 2n, userName: 'user2', firstName: "fn2", lastName: "ln2", email: "e2@test.com", userStatus: "A", department: "" }
      ]); 
    });    
  });  

  it('should delete the selected users', () => {
    const userService = TestBed.inject(UsersService);
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;

    component.ngOnInit(); 
    component.toDeleteIds.add(1n);
    component.deleteSelectedIds();
  
    component.ngOnInit();
  
    component.users$ = userService.getUsers();

    component.users$?.subscribe(value => {
      expect(value.length).toEqual(1); 
    });    
  });  


it('should add a new user', () => {
  const userService = TestBed.inject(UsersService);
  const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;

    const addUserComponent = TestBed.createComponent(AddUserComponent);
    const addUserComponentInst = addUserComponent.componentInstance;

    addUserComponentInst.onUserFormSubmit();

    component.ngOnInit();
  
    component.users$ = userService.getUsers();

    component.users$?.subscribe(value => {
      console.log(">> value: ", value);
      const user = value.find(v => v.userName === 'user1');
      expect( user?.userName ).toEqual('user1');
    });   
  });

  it('should update the selected user', () => {
    const userService = TestBed.inject(UsersService);
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;

    const updateUserComponent = TestBed.createComponent(UpdateUserComponent);
    const updateUserComponentInst = updateUserComponent.componentInstance;

    updateUserComponentInst.userId = 1n;
    updateUserComponentInst.onUserFormUpdateSubmit();

    component.ngOnInit();
  
    component.users$ = userService.getUsers();

    component.users$?.subscribe(value => {
      const user = value.find(v => v.userName === 'user1');
      expect( user?.userName ).toEqual('user1');
    });   
  });

});
