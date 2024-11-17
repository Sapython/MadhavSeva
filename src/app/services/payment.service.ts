import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paymentDetail } from '../structures/payment.structure';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private https:HttpClient,private _snackBar: MatSnackBar) { }
  WindowRef: any;
  orders: any[] = [];

  get MainWindowRef() {
    return this.WindowRef;
  }

  generateRecipetNumber(){
    return `Receipt#${Math.floor(Math.random() * 5123 * 43) + 10}`;
  }
  
  handlePayment(data:paymentDetail){
    console.log(data);
    this.WindowRef = window;
    var result:Subject<any> = new Subject();
    if(data.monthlySeva){
      let todayDate = data.sevaDate;
      let startDate = new Date(
        todayDate.setDate(todayDate.getDate() + 1)
      ).getTime();
      let endDate = new Date(
        todayDate.setMonth(todayDate.getMonth() + 366)
      ).getTime();
      startDate = parseInt(startDate.toString().slice(0, -3));
      endDate = parseInt(endDate.toString().slice(0, -3));
      let orderDetails = {
        plan_id: data.seva.subscriptionPlanId,
        quantity: 1,
        start_at: startDate,
        expire_by: endDate,
        notes: {
          receipt_number: this.generateRecipetNumber(),
          seva_name: data.seva.name,
          seva_cost: data.seva.price,
          seva_date: data.sevaDate,
        },
      };
      this.https.post(environment.cloudFunctions.createSubscription,orderDetails).subscribe((subscription:any) => {
        // console.log('subscription', subscription);
        var ref = this;
        var rzp1 = new this.WindowRef.Razorpay(
          {
            key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            name: data.seva.name + ' Subscription', // Enter the name that you want to appear on the receipt
            description: 'Subscription for ' + data.seva.name,
            subscription_id: subscription.id,
            currency: 'INR',
            image: 'https://madhavseva.com/assets/Images/logo.png',
            handler: function (response: any) {
              // console.log('Handler', response);
              ref.handleSubscription(response, result);
            },
            prefill: {
              name: data.sevakName,
              contact: '+91' + data.sevakPhone,
            },
            theme: {
              color: '#ffc670',
            },
          }
        );
        rzp1.open();
        result.next({...orderDetails,stage:"paymentGatewayOpened"})
      });
      return result
    } else {
      var ref = this;
      function preparePaymentDetails(order: any, orderDetails: paymentDetail,result:Subject<any>) {
        return {
          key: environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
          name: 'Pay',
          currency: order.currency,
          order_id: order.id, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
          image: 'https://madhavseva.com/assets/Images/logo.png',
          handler: function (response: any) {
            ref.finalizePayment(response,result);
          },
          prefill: {
            name: orderDetails.sevakName,
            contact: '+91' + orderDetails.sevakPhone,
          },
          theme: {
            color: '#ffc670',
          },
        };
      }
      let orderDetails = {
        amount: data.seva.price * 100,
        receipt: this.generateRecipetNumber(),
      };
      this.createOrder(orderDetails).subscribe((order) => {
          console.log("Payment details",order)
          let orderDetail = preparePaymentDetails(order, data,result)
          var rzp1 = new this.WindowRef.Razorpay(orderDetail);
          this.orders.push(orderDetail);
          rzp1.open();
          result.next({...orderDetails,stage:"paymentGatewayOpened"})
        },
        (error) => {
          this._snackBar.open(error.message, "Error", {
            duration: 2000,
          });
          result.next({...orderDetails,stage:"paymentGatewayError"})
        },
        ()=>{
          // completed
          result.next({...orderDetails,stage:"paymentGatewayClosed"})
        }
      )
      return result
    }
  }
  handleSubscription(response: any,result:Subject<any>) {
    this.https.post(
      environment.cloudFunctions.verifySubscription,
      response,
      { responseType: 'json' }
    ).subscribe((res: any) => {
      console.log('Subscription', res);
      if (res.verified == true){
        result.next({...res,response,stage:"paymentCaptureSuccess"})
      } else {
        result.next({...res,response,stage:"paymentCaptureFailed"})
      }
    });
  }

  finalizePayment(response: any,result:Subject<any>) {
    console.log(response);
    this.https.post(
      environment.cloudFunctions.capturePayment,{
      amount: this.orders.find((order) => order.order_id == response.razorpay_order_id).amount,
      payment_id: response.razorpay_payment_id,
    }).subscribe((res: any) => {
      if (res.res.statusCode) {
        console.log("Current order detail",res)
        result.next({...res,stage:"paymentCaptureSuccess"})
      } else {
        console.log('Some error occured please retry your payment. Or please contact +91-9026296062', res);
        result.next({...res,stage:"paymentCaptureFailed"})
      }
    });
  }

  handleSubscriptionPayment(data:paymentDetail){

  }

  createOrder(orderDetails: any) {
    return this.https.post(
      environment.cloudFunctions.createOrder,
      orderDetails
    );
  }
}
