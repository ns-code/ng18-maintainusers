import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserMockService } from './service/user.mockservice';
import { UsersService } from './service/users.service';
import { of } from 'rxjs';
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
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ]); 
    });    
  });  

  it('should delete the selected users', () => {
    const userService = TestBed.inject(UsersService);
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;

    component.ngOnInit(); 
    component.toDeleteIds.add(1);
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

    // spyOn(userService, 'createUser').and.callThrough(); 

    addUserComponentInst.name.setValue("user 123");
    addUserComponentInst.addUser(null);
    // expect(userService.createUser).toHaveBeenCalled();

    component.ngOnInit();
  
    component.users$ = userService.getUsers();

    component.users$?.subscribe(value => {
      console.log(">> value: ", value);
      const user = value.find(v => v.name === 'user 123');
      expect( user?.name ).toEqual('user 123');
    });   
  });

  it('should update the selected user', () => {
    const userService = TestBed.inject(UsersService);
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;

    const updateUserComponent = TestBed.createComponent(UpdateUserComponent);
    const updateUserComponentInst = updateUserComponent.componentInstance;

    // spyOn(userService, 'updateUser').and.callThrough(); 

    updateUserComponentInst.name.setValue("user 123");
    updateUserComponentInst.userId = 1;
    // expect(userService.updateUser).toHaveBeenCalled();
    updateUserComponentInst.updateUser(null);

    component.ngOnInit();
  
    component.users$ = userService.getUsers();

    component.users$?.subscribe(value => {
      console.log(">> value: ", value);
      const user = value.find(v => v.name === 'user 123');
      expect( user?.name ).toEqual('user 123');
    });   
  });

});
