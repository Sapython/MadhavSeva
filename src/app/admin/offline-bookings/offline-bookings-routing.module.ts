import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineBookingsComponent } from './offline-bookings.component';

const routes: Routes = [{ path: '', component: OfflineBookingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineBookingsRoutingModule { }
