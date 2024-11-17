import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.loginEmailPassword(this.loginForm.value.email, this.loginForm.value.password).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }

}
