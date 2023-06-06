import { Component,OnInit} from '@angular/core';
import { FormGroup,FormControl,FormArray, Validators } from '@angular/forms';
import {Router,NavigationStart,NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent  {
  userData:any[]=[]
title="Hi there";
  receiveData(data:any){
    console.log("Appx",this.userData)
    this.userData=data
    console.log("App",this.userData)

  }
  lat=51.678418;
  lng=7.809007;
}
