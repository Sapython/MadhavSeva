import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';
import { DataProvider } from 'src/app/services/data-provider.service';
import { PaymentService } from 'src/app/services/payment.service';
import { paymentDetail, Seva } from 'src/app/structures/payment.structure';


@Component({
  selector: 'app-buy-seva',
  templateUrl: './buy-seva.component.html',
  styleUrls: ['./buy-seva.component.scss']
})
export class BuySevaComponent {
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(@Inject(DIALOG_DATA) public seva:Seva,private _snackBar: MatSnackBar,private paymentService:PaymentService,private bookingService:BookingService,private dataProvider:DataProvider) { }
  recipents:any[] = [
    {
      name:"Vishal Prabhu",
      email:"vishalPrabhu@gmail.com"
    }
  ]
  bookSevaForm:FormGroup = new FormGroup({
    sevakName:new FormControl('',Validators.required),
    sevakPhone:new FormControl('',Validators.required),
    sevaDate:new FormControl('',Validators.required),
    monthlySeva:new FormControl(''),
    gift:new FormControl(''),
    giftedPerson:new FormControl(''),
    mode:new FormControl('',Validators.required),
    recipent:new FormControl('')
  })

  submit(){
    console.log(this.bookSevaForm.value);
    if (this.bookSevaForm.valid){
      let data:paymentDetail = {
        ...this.bookSevaForm.value,
        seva:this.seva,
        date:new Date()
      }
      if (data.mode=='offline' && data.recipent){
        this.dataProvider.pageSettings.blur = true;
        this.bookingService.addBookingOffline(data).then(()=>{
          this._snackBar.open("Booking added successfully");
          this.close.emit();
        }).catch((err:any)=>{
          console.log(err);
          this._snackBar.open("Error adding booking");
        })
        this.close.emit();
      } else if (data.mode == 'online'){
        this.dataProvider.pageSettings.blur = true;
        this.paymentService.handlePayment(data).subscribe((res)=>{
          console.log(res);
          if(res.stage=='paymentCaptureSuccess'){
            this._snackBar.open("Payment successful");
            this.close.emit();
            this.bookingService.addBooking({...data,orderDetail:res}).then(()=>{
              this._snackBar.open("Booking added successfully");
              this.close.emit();
            }).catch((err:any)=>{
              console.log(err);
              this._snackBar.open("Error adding booking");
            }).finally(()=>{
              this.dataProvider.pageSettings.blur = false;
            })
          }else {
            this.dataProvider.pageSettings.blur = false;
          }
          // this._snackBar.open("Payment successful");
          // this.close.emit(); 
        },(err)=>{
          this.dataProvider.pageSettings.blur = false;
        })
      }
    }
  }
}
