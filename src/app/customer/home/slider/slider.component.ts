import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  
  currentSource = "assets/slider/service (1).jpeg"
  sources = [
    "assets/slider/service (1).jpeg",
    "assets/slider/service (2).jpg",
    "assets/slider/service (3).jpg",
    "assets/slider/service (4).jpg",
    "assets/slider/service (5).jpg",
    "assets/slider/service (6).jpg",
    "assets/slider/service (7).jpg",
  ]
  mobileSources = [
    "assets/mobileSlider/slider (1).jpeg",
    "assets/mobileSlider/slider (2).jpeg",
    "assets/mobileSlider/slider (3).jpeg",
    "assets/mobileSlider/slider (4).jpeg",
    "assets/mobileSlider/slider (5).jpeg",
    "assets/mobileSlider/slider (6).jpeg",
    "assets/mobileSlider/slider (7).jpeg",
    "assets/mobileSlider/slider (8).jpeg"
  ]
  windowWidth = window.innerWidth;

  ngOnInit(){
    if (this.windowWidth < 700){
      this.currentSource = this.mobileSources[0]
    }
  }
  nextSource() {
    if (this.windowWidth < 700){
      let index = this.mobileSources.indexOf(this.currentSource)
      if (index == this.mobileSources.length - 1) {
        index = 0
      } else {
        index++
      }
      this.currentSource = this.mobileSources[index]
    } else {
      let index = this.sources.indexOf(this.currentSource)
      if (index == this.sources.length - 1) {
        index = 0
      } else {
        index++
      }
      this.currentSource = this.sources[index]
    }
  }
  prevSource(){
    if (this.windowWidth < 700){
      let index = this.mobileSources.indexOf(this.currentSource)
      if (index == 0) {
        index = this.mobileSources.length - 1
      } else {
        index--
      }
      this.currentSource = this.mobileSources[index]
    } else {
      let index = this.sources.indexOf(this.currentSource)
      if (index == 0) {
        index = this.sources.length - 1
      } else {
        index--
      }
      this.currentSource = this.sources[index]
    }
  }
}
