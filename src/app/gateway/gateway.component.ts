import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

// import * as Razorpay from 'razorpay';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
})
export class GatewayComponent implements OnInit {
  constructor(private dataservice: DataService) {}
  ngOnInit(): void {
    this.loadScript();
  }

  options = {
    key: 'rzp_test_HHjgzUNivR16mK', // Enter the Key ID generated from the Dashboard
    amount: 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'praveen',
    description: 'Test Transaction',
    // image: 'https://example.com/your_logo',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response: any) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: 'praveenkumar',
      email: 'kumar@example.com',
      contact: '9000090000',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#0000FF',
    },
  };
  rzp1: any;
  newpay() {
    this.rzp1 = new this.dataservice.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }
  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}
