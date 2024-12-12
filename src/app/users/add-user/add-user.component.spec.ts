import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent, RouterModule.forRoot([])],
      providers: [ provideHttpClient(), provideHttpClientTesting() ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AddUserComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'ng18-app2' title`, () => {
  //   const fixture = TestBed.createComponent(UsersComponent);
  //   const comp = fixture.componentInstance;
  //   expect(comp.deleteUserRes$).toEqual('ng18-app2');
  // });
});
