import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  Form,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/authService';
import { ActivatedRoute, Router } from '@angular/router';

import { faL } from '@fortawesome/free-solid-svg-icons';

declare var Razorpay: any;

@Component({
  selector: 'app-apply-f',
  templateUrl: './apply-f.component.html',
  styleUrls: ['./apply-f.component.css'],
})
export class ApplyFComponent implements OnInit {
  isTrySubmit: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  popup: boolean = true;

  //Razor pay options

  buyRazorPay(formdata: any) {
    this.isTrySubmit = true;
    // this.loading=true;
  }

  ngOnInit(): void {
    // this.getv();
  }

  s = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    // Email: new FormControl('', [Validators.required]),
    // rad: new FormControl('', [Validators.required]),
  });
  dropdowns: any = {};
  user() {
    this.isTrySubmit = true;
    if (this.s.valid) {
      let User = this.s.value;
      console.log('User-Values', User);
      this.authService
        .httpRequest({
          url: '/user-values/post',
          method: 'post',
          // auth: true,
          data: { name: User.name, date: User.date },
          // data:User
        })
        .then((data) => {
          if (data.statusCode == 200) {
            //thank message and email verfication
            this.authService.showSuccess('Account created successfully');
            // this.router.navigate(['signin']); //'signin',
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

  // getv() {
  //   this.http.get('http://localhost:4200/apply').subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  pop() {
    this.isTrySubmit = true;
    if (this.s.valid) {
      let ser = this.s.value;
    }
    if (0 < this.user.length) {
      console.log('dkskdkfkf');
    }
  }
  // x = 0;

  pay() {
    const razorPayoptins = {
      description: 'start Razorpay payment',
      currency: 'INR',
      amount: 100,
      name: 'praveen',
      key: 'rzp_test_HHjgzUNivR16mK',
      Image: '',
      order_id: '',
      prefill: {
        name: 'praveenkumar',
        email: 'k@gmail.com',
        phone: '9626806767',
      },
      theme: {
        color: '#f37254',
      },
      model: {
        onDismiss: () => {
          console.log('dismissed');
        },
      },
    };

    const succussCalback = (paymentId: any) => {
      console.log(paymentId, 'sss');
    };
    const failureCalback = (error: any) => {
      console.log('erro', error);
    };
    Razorpay.open(razorPayoptins, succussCalback, failureCalback);
  }
}
