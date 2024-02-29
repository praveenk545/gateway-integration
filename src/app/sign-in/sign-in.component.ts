import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../core/servies/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  icons = { eye: faEye, eyeSlash: faEyeSlash };
  pageReady: boolean = false;
  isTrySubmit: boolean = false;
  isVisiblePassword: boolean = false;
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  error = '';
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}
  visibleSwitch() {
    this.isVisiblePassword = !this.isVisiblePassword;
  }
  async login() {
    if (this.signInForm.valid) {
      let data: any = await this.authService
        .login(this.signInForm.value)
        .then((data: any) => {
          if (data.statusCode != 200) {
            this.error =
              data.message && data.message.length > 0
                ? data.message[0]
                : 'Something is problem';
          }
        })
        .catch((error: any) => {
          //console.log('error', error);
          if (error.statusCode <= 500) {
            this.error = 'Internal Server Error';
          } else {
            this.error = 'Invalid username or password';
          }
        });
    }
  }
}
