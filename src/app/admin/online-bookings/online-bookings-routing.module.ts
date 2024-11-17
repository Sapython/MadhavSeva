import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineBookingsComponent } from './online-bookings.component';

const routes: Routes = [{ path: '', component: OnlineBookingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineBookingsRoutingModule { }
