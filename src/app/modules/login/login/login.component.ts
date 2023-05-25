import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router }from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Login, LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(
    private router: Router,
    private dataService: DataService,
    private LoginService: LoginRegisterService
  ) { 
    
  }

  ngOnInit(): void {

  }

  public login(): void{
    localStorage.setItem('Role', 'User');
    this.dataService.changeUserData(this.loginForm.value);
    this.LoginService.GetAcountByEmail(this.loginForm.value.email).subscribe(
      data => {
        if(data.email != null)
          {
            localStorage.setItem('idUser', data.id);
          }
      }
        
    )
    let login = new Login(this.loginForm.value.email, this.loginForm.value.password);
    console.log(login)
    this.LoginService.LoginUser(login).subscribe(
      data => {
        console.log(data.token)
        if(data.token.length > 1)
          {
            localStorage.setItem('Role', 'User');
            this.router.navigate(['/contract-search']);
          }
      }
        
    )

  }

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

}
