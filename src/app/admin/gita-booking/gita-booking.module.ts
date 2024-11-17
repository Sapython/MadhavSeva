import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GitaBookingRoutingModule } from './gita-booking-routing.module';
import { GitaBookingComponent } from './gita-booking.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 
import {MatChipsModule} from '@angular/material/chips'; 
@NgModule({
  declarations: [
    GitaBookingComponent
  ],
  imports: [
    CommonModule,
    GitaBookingRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule
  ]
})
export class GitaBookingModule { }
