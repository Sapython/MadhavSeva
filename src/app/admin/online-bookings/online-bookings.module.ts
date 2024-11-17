import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineBookingsRoutingModule } from './online-bookings-routing.module';
import { OnlineBookingsComponent } from './online-bookings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    OnlineBookingsComponent
  ],
  imports: [
    CommonModule,
    OnlineBookingsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class OnlineBookingsModule { }
