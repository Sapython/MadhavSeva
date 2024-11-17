import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { BuySevaComponent } from '../buy-seva/buy-seva.component';
import { Seva } from 'src/app/structures/payment.structure';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sevas',
  templateUrl: './sevas.component.html',
  styleUrls: ['./sevas.component.scss']
})
export class SevasComponent {
  sevas:Seva[] = [
    {
      image:"assets/sevaImages/seva (6).png",
      name:"1 Day , All Gau seva",
      price:11001,
      subscriptionPlanId:"plan_Inbw6VpPZHQD7w"
    },
    {
      image:"assets/sevaImages/seva (2).png",
      name:"Vaishnav Brahman Prasadam Seva",
      price:5101,
      subscriptionPlanId:"plan_Kyl25WOeMgjXs1"
    },
    {
      image:"assets/sevaImages/seva (3).png",
      name:"1 Day, Annadan",
      price:2501,
      subscriptionPlanId:"plan_Kyl3Sod1HG7f4x"
    },
    {
      image:"assets/sevaImages/seva (7).png",
      name:"Raj Bhog Seva",
      price:2101,
      subscriptionPlanId:"plan_Kyl5MCafhpgwNV"
    },
    {
      image:"assets/sevaImages/seva (5).png",
      name:"Pushpa Seva",
      price:1501,
      subscriptionPlanId:"plan_Kyl7V6RsARCJ1p"
    },
    {
      image:"assets/sevaImages/seva (1).png",
      name:"Sandhyaa Aarti Seva",
      price:1101,
      subscriptionPlanId:"plan_KylAQaSy6at8Uu"
    },
    {
      image:"assets/sevaImages/seva (12).png",
      name:"Sringar Aarti seva",
      price:1101,
      subscriptionPlanId:"plan_KylBVYJkM253qk"
    },
    {
      image:"assets/sevaImages/seva (12).png",
      name:"Sandhya Bhog Seva",
      price:1101,
      subscriptionPlanId:"plan_KylDRIFFPnHlz7"
    },
    {
      image:"assets/sevaImages/seva (10).png",
      name:"Bal Bhog Seva",
      price:501,
      subscriptionPlanId:"plan_KylF0Jzzz51jPA"
    },
    {
      image:"assets/sevaImages/seva (9).png",
      name:"1 Day, 1 Gau - seva",
      price:501,
      subscriptionPlanId:"plan_KylGP14z4gASJ4"
    },
    {
      image:"assets/sevaImages/seva (11).png",
      name:"Mangla Aarti seva",
      price:501,
      subscriptionPlanId:"plan_KylHgWf3rFvL8M"
    },
    {
      image:"assets/sevaImages/seva (13).webp",
      name:"Lifetime Membership",
      price:35555,
      subscriptionPlanId:"noSub"
    },
    // {
    //   image:"assets/sevaImages/seva (4).png",
    //   name:"Uttan Bhog Seva",
    //   price:251,
    //   subscriptionPlanId:"plan_KylIHucm020yLY"
    // },
  ];
  constructor(private dialog:Dialog){}
  buySeva(seva:any){
    console.log(environment.RAZORPAY_KEY_ID)
    const dialogRef = this.dialog.open(BuySevaComponent, {data:seva})
    dialogRef.componentInstance?.close.subscribe(()=>{
      dialogRef.close();
    })
  }
}
