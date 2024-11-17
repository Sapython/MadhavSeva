import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { GitaBookingComponent } from './gita-booking/gita-booking.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  constructor(private dialog:Dialog){}
  openBookingDialog(){
    const dialogRef = this.dialog.open(GitaBookingComponent)
    dialogRef.componentInstance?.close.subscribe(()=>{
      dialogRef.close();
    })
  }
  data: any;
  continue(){
    window.open(this.data, '_blank');
  }
}
