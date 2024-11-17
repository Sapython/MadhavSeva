import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineBookingsRoutingModule } from './offline-bookings-routing.module';
import { OfflineBookingsComponent } from './offline-bookings.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    OfflineBookingsComponent
  ],
  imports: [
    CommonModule,
    OfflineBookingsRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class OfflineBookingsModule { }
