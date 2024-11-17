import { Component } from '@angular/core';
import { DataProvider } from './services/data-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MadhavSeva';
  constructor(public dataProvider:DataProvider) { }
}
