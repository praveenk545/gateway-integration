import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../core/servies/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent implements OnInit {
  screen: string = '';
  icons = { eye: faEye, eyeSlash: faEyeSlash };
  pageReady: boolean = false;
  query: any = {};
  isTrySubmit: boolean = false;
  isVisiblePassword: boolean = false;
  resetPasswordForm = new FormGroup({
    email: new FormControl({ disabled: true, value: '' }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParams;
    this.route.queryParams.subscribe((params: Params) => {
      this.query = params;
    });
    this.screen = this.query.stage;
    this.screen = !this.screen && this.query.tag ? 'SET' : this.screen;
    if (this.query.tag) {
      this.authService
        .httpRequest({
          url: 'user/account/tag-info/',
          method: 'post',
          loaderOff: true,
          data: { tag: this.query.tag },
        })
        .then((data) => {
          if (data.statusCode == 200) {
            this.resetPasswordForm.get('email')?.setValue(data.data.email);
            this.pageReady = true;
          } else {
            //invaild user
            this.authService.showError(data.message);

            this.router.navigate(['/reset-password'], {
              queryParams: { stage: 'FAILED' },
            });
            this.screen = 'FAILED';
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
  passwordReset() {
    this.isTrySubmit = true;
    if (this.resetPasswordForm.valid) {
      let sendData = this.resetPasswordForm.value;
      this.authService
        .httpRequest({
          url: 'user/account/set-password',
          method: 'post',
          data: { password: sendData.password, tag: this.query.tag },
        })
        .then((data) => {
          if (data.statusCode == 200) {
            //thank message and email verfication
            this.router.navigate(['/reset-password'], {
              queryParams: { stage: 'SUCCESS' },
            });
            this.screen = 'SUCCESS';
          } else {
            //show error
            this.authService.showError(data.message[0]);
            this.router.navigate(['/reset-password'], {
              queryParams: { stage: 'FAILED' },
            });
            this.screen = 'FAILED';
          }
        })
        .catch((error) => {
          //unexpected error
          //this.authService.showError(error.error.message[0]);
          this.authService.showError('Error');
        });
    }
  }
}
