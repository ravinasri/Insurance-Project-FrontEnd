import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './login';
import { loginservice } from './login.service';

@Component({ templateUrl: 'login.component.html', styleUrls: ['./login.component.css'] })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  post: any = '';
  username: String;
  password: String;
  users: Login[];



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private loginservice: loginservice
  ) {

  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }


  get f() { return this.loginForm.controls; }



  onSelect() {

    // alert(this.f.username.value+this.f.password.value)

    this.username = this.f.username.value
    this.password = this.f.password.value
    this.loginservice.getLogin(this.username, this.password)

      .subscribe(
        data => {
          this.users = data;
          if (this.users.length == 0) {
            alert("Invalid Credentials");
          }
          else {
            this.router.navigate(['/home']);
          }
          console.log("users" + this.users);
        }
      );
  }
}

