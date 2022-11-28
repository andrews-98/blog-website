import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  form: FormGroup
  submitted: boolean = false
  loginMessege: string = ''


  constructor( public auth: AuthService,
               private route: Router,
               private actroute: ActivatedRoute,
               private alert: AlertService
               ) { }

  ngOnInit(): void {
    this.actroute.queryParams.subscribe((params: Params) => {
       if(params['loginAgain']){
         this.loginMessege = 'Please login to your account'
       } else if (params['authFailed']){
         this.loginMessege = 'Session time is out. Please login to your account'
       }
    })

   this.form = new FormGroup({
     email: new FormControl(null,[Validators.required, Validators.email]),
     password: new FormControl(null,[Validators.required,Validators.minLength(6)])
   })
  }


  submit() {
    if(this.form.invalid){
      return
    }
    this.submitted = true
    let user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.route.navigate(['/admin', 'dashboard'])
      this.submitted = false
      this.auth.errorMsg = ''
      this.alert.success('Login Succes')
    }, error => {
      this.auth.handleError(error)
      this.submitted = false
      this.alert.danger('Login Failed')
    })
    this.loginMessege = ''
  }
}
