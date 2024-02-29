import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/servies/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  icons = { eye: faEye, eyeSlash: faEyeSlash };
  pageReady: boolean = true;
  add: any = {};

  isTrySubmit: boolean = false;
  isVisiblePassword: boolean = false;
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    PermanantAddress: new FormControl('', [Validators.required]),
    CurrentAddrerss: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.requiredTrue]),
    Department: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    Destination: new FormControl('', [Validators.required]),
  });
  dropdowns: any = {};
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getdropdown();
  }
  getdropdown() {
    this.authService
      .httpRequest({
        url: 'user/user/dropDwon',
        method: 'get',
      })
      .then((data) => {
        if (data.statusCode == 200) {
          this.dropdowns = data.data
          console.log("drp", this.dropdowns);
        } else {
          //show error
          this.authService.showError(data.message[0]);
        }
      })
      .catch((error) => {
        //unexpected error
        //this.authService.showError(error.error.message[0]);
        this.authService.showError('Error');
      });

  }

  signUp() {
    console.log('signUpForm', this.signUpForm);
    this.isTrySubmit = true;
    if (this.signUpForm.valid) {
      let sendData = this.signUpForm.value;
      sendData.terms = undefined;
      console.log('sendData', sendData);
      this.authService
        .httpRequest({
          url: 'user',
          method: 'post',
          data: sendData,
        })
        .then((data) => {
          if (data.statusCode == 200) {
            //thank message and email verfication
            this.authService.showSuccess('Account created successfully');
            this.router.navigate(['signin']); //'signin',
          } else {
            //show error
            this.authService.showError(data.message[0]);
          }
        })
        .catch((error) => {
          //unexpected error
          //this.authService.showError(error.error.message[0]);
          this.authService.showError('Error');
        });
    }
  }
  visibleSwitch() {
    this.isVisiblePassword = !this.isVisiblePassword;
  }
  typeChange(type: string | null) { }
}
