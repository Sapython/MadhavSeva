import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'online',
        pathMatch: 'full', 
      },
      {
        path: 'online',
        loadChildren: () =>
          import('./online-bookings/online-bookings.module').then(
            (m) => m.OnlineBookingsModule
          ),
      },
      {
        path: 'offline',
        loadChildren: () =>
          import('./offline-bookings/offline-bookings.module').then(
            (m) => m.OfflineBookingsModule
          ),
      },
      { path: 'gitaBooking', loadChildren: () => import('./gita-booking/gita-booking.module').then(m => m.GitaBookingModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
