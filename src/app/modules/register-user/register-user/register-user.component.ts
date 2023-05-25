import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router }from '@angular/router';
import { LoginRegisterService, Register } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(
    private router: Router,
    private registerService: LoginRegisterService,
  ) { }

  ngOnInit(): void {
  }

  public createForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  public register(): void{
    let register = new Register(
      this.createForm.value.name,
      this.createForm.value.userName,
      this.createForm.value.email,
      this.createForm.value.password
      )
    this.registerService.RegisterUser(register).subscribe(
      data => {
        if(data == true)
          this.router.navigate(['/login'])
        else
          console.log("account already exists")
      }
    )
  }

}
