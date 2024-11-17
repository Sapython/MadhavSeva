import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GitaBookingComponent } from './gita-booking.component';

const routes: Routes = [{ path: '', component: GitaBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GitaBookingRoutingModule { }
