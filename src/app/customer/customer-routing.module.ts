import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'privacyPolicy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'returnPolicy',
        loadChildren: () =>
          import('./return-policy/return-policy.module').then(
            (m) => m.ReturnPolicyModule
          ),
      },
      {
        path: 'termsAndConditions',
        loadChildren: () =>
          import('./terms-and-conditions/terms-and-conditions.module').then(
            (m) => m.TermsAndConditionsModule
          ),
      },
      { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
