import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { DataProvider } from 'src/app/services/data-provider.service';
import { paymentDetail } from 'src/app/structures/payment.structure';

@Component({
  selector: 'app-offline-bookings',
  templateUrl: './offline-bookings.component.html',
  styleUrls: ['./offline-bookings.component.scss']
})
export class OfflineBookingsComponent {

  constructor(private bookingService:BookingService,private dataProvider:DataProvider) { }
  bookings:paymentDetail[] = [];
  ngOnInit(): void {
    this.bookingService.getOfflineBookings().then((res)=>{
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


  approve(booking:paymentDetail){
    this.dataProvider.pageSettings.blur = true;
    this.bookingService.updateBooking(booking.id,{approved:!booking.approved}).then((res)=>{
      this.ngOnInit();
    }).catch((err)=>{
      console.log(err);
      alert(err);
    }).finally(()=>{
      this.dataProvider.pageSettings.blur = false;
    })
  }
}
