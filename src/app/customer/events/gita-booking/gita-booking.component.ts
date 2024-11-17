import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from 'src/app/services/booking.service';
import { DataProvider } from 'src/app/services/data-provider.service';
import { PaymentService } from 'src/app/services/payment.service';
import { paymentDetail } from 'src/app/structures/payment.structure';

@Component({
  selector: 'app-gita-booking',
  templateUrl: './gita-booking.component.html',
  styleUrls: ['./gita-booking.component.scss']
})
export class GitaBookingComponent {
  @Output() close:EventEmitter<any> = new EventEmitter<any>();
  constructor(private _snackBar: MatSnackBar,private paymentService:PaymentService,private bookingService:BookingService,private dataProvider:DataProvider) { }
  recipents:any[] = [
    {
      name:"Vishal Prabhu",
      email:"vishalPrabhu@gmail.com"
    },
    {
      name:"Harsh Prabhu",
      email:"vishalPrabhu@gmail.com"
    },
    {
      name:"Dinadayal Krishna Das",
      email:"vishalPrabhu@gmail.com"
    },
    {
      name:"Ajay Ram Prabhu",
      email:"vishalPrabhu@gmail.com"
    },
    {
      name:"Vipul Prabhu",
      email:"vishalPrabhu@gmail.com"
    },
    {
      name:"Prahlad Bandhu",
      email:"vishalPrabhu@gmail.com"
    },
  ]
  bookSevaForm:FormGroup = new FormGroup({
    sevakName:new FormControl('',Validators.required),
    sevakPhone:new FormControl('',Validators.required),
    dateOfBirth:new FormControl('',Validators.required),
    address:new FormControl(''),
    reason:new FormControl(''),
    email:new FormControl(''),
    occupation:new FormControl(''),
    city:new FormControl('',Validators.required),
    mode:new FormControl('',Validators.required),
    recipent:new FormControl('')
  })
  seva = {
    image:"assets/sevaImages/seva (12).png",
    name:"Gitamritam",
    price:100
  };
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
        this.bookingService.addGitaBookingOffline(data).then(()=>{
          this._snackBar.open("Booking added successfully");
          this.close.emit();
        }).catch((err:any)=>{
          console.log(err);
          this._snackBar.open("Error adding booking");
        }).finally(()=>{
          this.dataProvider.pageSettings.blur = false;
        })
        this.close.emit();
      } else if (data.mode == 'online'){
        this.dataProvider.pageSettings.blur = true;
        this.paymentService.handlePayment(data).subscribe((res)=>{
          console.log(res);
          if(res.stage=='paymentCaptureSuccess'){
            this._snackBar.open("Payment successful");
            this.close.emit();
            this.bookingService.addGitaBooking({...data,orderDetail:res}).then(()=>{
              this._snackBar.open("Booking added successfully");
              this.close.emit();
              this.dataProvider.pageSettings.blur = false;
            }).catch((err:any)=>{
              console.log(err);
              this._snackBar.open("Error adding booking");
              this.dataProvider.pageSettings.blur = false;
            }).finally(()=>{
              this.dataProvider.pageSettings.blur = false;
            })
          }
        },(err)=>{
          console.log(err);
          this._snackBar.open("Error adding booking");
          this.dataProvider.pageSettings.blur = false;
        },()=>{
          this.dataProvider.pageSettings.blur = false;
        })
      }
    }
  }
}
