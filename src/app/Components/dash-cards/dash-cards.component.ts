import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-cards',
  templateUrl: './dash-cards.component.html',
  styleUrls: ['./dash-cards.component.css']
})
export class DashCardsComponent implements OnInit {
@Input('active') totalActive:number;
@Input('deaths') totalDeaths:number;
@Input('recovered') totalRecovered:number;
@Input('confirmed') totalConfirmed:number;
  constructor() { }

  ngOnInit(): void {
  }

}
