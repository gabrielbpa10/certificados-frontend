import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  urlHome!: string ;
  constructor() { }

  ngOnInit(): void {
    if(environment.production){
      this.urlHome = environment.urlHome;
    }
  }

}
