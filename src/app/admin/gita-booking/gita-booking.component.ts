import { Component } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { DataProvider } from 'src/app/services/data-provider.service';
import { paymentDetail } from 'src/app/structures/payment.structure';

@Component({
  selector: 'app-gita-booking',
  templateUrl: './gita-booking.component.html',
  styleUrls: ['./gita-booking.component.scss']
})
export class GitaBookingComponent {
  tableView:boolean = window.innerWidth>700;
  offlineBookings:number = 0;
  onlineBookings:number = 0;
  constructor(private bookingService:BookingService,private dataProvider:DataProvider) { }
  bookings:any[] = [];
  ngOnInit(): void {
    this.bookingService.getGitaBookings().then((res)=>{
      console.log(res);
      this.bookings = []
      res.forEach((doc:any)=>{
        // console.log(JSON.parse(doc.data().orderDetail.body));
        if (doc.data().orderDetail){
          this.bookings.push({...doc.data(),id:doc.id,orderDetail:{...doc.data().orderDetail,body:JSON.parse(doc.data().orderDetail.body)}});
          this.onlineBookings++;
        } else {
          this.bookings.push({...doc.data(),id:doc.id});
          this.offlineBookings++;
        }
      })
      console.log(this.bookings);
    })
  }


  approve(booking:any){
    this.dataProvider.pageSettings.blur = true;
    this.bookingService.updateGitaBooking(booking.id,{approved:!booking.approved}).then((res)=>{
      this.ngOnInit();
    }).catch((err)=>{
      console.log(err);
      alert(err);
    }).finally(()=>{
      this.dataProvider.pageSettings.blur = false;
    })
  }

  removeCommasAndQuotesAndEndLine(str:string){
    str = str.toString();
    return str.replace(/,/g,'').replace(/"/g,'').replace(/\n/g,'')
  }

  exportBookings(){
    // convert bookings to csv
    let csv = "Name,Phone,Email,Reason,Mode,Recipent,Address,City,Occupation,DOB,Transaction Id,Transaction Status\n";
    this.bookings.forEach((booking)=>{
      let data = `${this.removeCommasAndQuotesAndEndLine(booking.sevakName)},${this.removeCommasAndQuotesAndEndLine(booking.sevakPhone)},${this.removeCommasAndQuotesAndEndLine(booking.email)},${this.removeCommasAndQuotesAndEndLine(booking.reason)},${this.removeCommasAndQuotesAndEndLine(booking.mode =='online' ? 'Online' :'Offline')},${this.removeCommasAndQuotesAndEndLine(booking.recipent ? booking.recipent.name : 'N/A')},${this.removeCommasAndQuotesAndEndLine(booking.address)},${this.removeCommasAndQuotesAndEndLine(booking.city)},${this.removeCommasAndQuotesAndEndLine(booking.occupation)},${this.removeCommasAndQuotesAndEndLine(booking.dateOfBirth.toDate().toLocaleDateString())},${this.removeCommasAndQuotesAndEndLine(JSON.parse(booking.orderDetail?.res?.body || '{"id":"N/A"}')['id'])},${this.removeCommasAndQuotesAndEndLine(booking.orderDetail?.stage || 'N/A')}\n`
      console.log(data.split(','));
      csv += data
    })
    var blob = new Blob([csv], { type: 'text/csv' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}

