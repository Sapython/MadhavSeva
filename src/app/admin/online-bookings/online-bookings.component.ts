import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { paymentDetail } from 'src/app/structures/payment.structure';

@Component({
  selector: 'app-online-bookings',
  templateUrl: './online-bookings.component.html',
  styleUrls: ['./online-bookings.component.scss']
})
export class OnlineBookingsComponent implements OnInit {
  desktopView:boolean = window.innerWidth>600;
  constructor(private bookingService:BookingService) { }
  bookings:paymentDetail[] = [];
  ngOnInit(): void {
    this.bookingService.getOnlineBookings().then((res)=>{
      console.log(res);
      this.bookings = []
      res.forEach((doc:any)=>{
        if (doc.data().offline==true){
          return
        }
        console.log(JSON.parse(doc.data().orderDetail.body));
        
        this.bookings.push({...doc.data(),id:doc.id,orderDetail:{...doc.data().orderDetail,body:JSON.parse(doc.data().orderDetail.body)}});
        console.log(this.bookings);
      })
    })
  }

}
