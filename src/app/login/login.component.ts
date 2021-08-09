import {Component, OnInit} from '@angular/core';
import {loginModel} from "./_model/auth.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorForm = false;
  form: loginModel = {} as loginModel;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.form) {
      if (this.form.userID === 'userID' && this.form.password === 'password123') {
        this.form.fakeToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwODg4ODg4ODgzOSIsIm5iZiI6MTYyMzkxMDM3Miwicm9sZXMiOlsiTE9HSU4iXSwiaXNzIjoiQXN0cmFQYXktRGV2IiwiZXhwIjoxNjIzOTEzOTcyLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjIzOTEwMzcyLCJ1c2VySWQiOjM5MywiZGV2aWNlSWQiOiJzdHJpbmciLCJqdGkiOiJhMTM1Njk0MS0wNDEwLTQ2YjgtODZjOS1mZjYyZmIzYzczMTUiLCJlbWFpbCI6WyJuaXRlc2guZ2FyZzEyM0BnbWFpbC5jb20iXX0.B0-Zhsj7pebuZ9bSw88se_q4zCptcjP2Au3KlY6fysxWlxGrLt5pJMAnR1HL3Bt1oa9CPoTIMLWgrUwoWGAHtQ';
        localStorage.setItem('userData', JSON.stringify(this.form));
        this.router.navigate(['/']);
      } else {
        this.errorForm = true;
      }
    } else {
      this.errorForm = true;
    }
  }

  close() {
    this.errorForm = false;
  }
}
