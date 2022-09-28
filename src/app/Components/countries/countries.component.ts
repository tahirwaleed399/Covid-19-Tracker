import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globaldata';
import { DateWiseData } from 'src/app/models/globalDateData';
import { DoughnutDataPoint } from 'chart.js';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Chart, registerables } from 'chart.js';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({

  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
isLoader = false;
data:GlobalDataSummary[];
dateWiseData:DateWiseData={};
countries: string[]=[];
pCountry:string ="Selected Country";
totalActive:any="...";
totalConfirmed:any ="...";
totalDeaths:any ="...";
totalRecovered:any="...";
countryDateData:DateWiseData[]=[];
labels:any;
lineData:any;
selectedCountryDateData:any;
selectedCountryDateDatacopy:any;
linechartJs:any;
sliderObject = [
  {
    heading : "Covid 19 in Pakistan",
    para : "Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention."
    ,
    imgSrc : "assets/covid4.jpg",
  }, {
    heading : "COVID-19 vaccine  ",
    para : " How concerned should we be about the new variants of SARS CoV 2 which cause COVID-19? Is it unusual for viruses to change and mutate? Do vaccines protect against these variants and what can you do to protect yourself? WHO’s Chief Scientist Dr Soumya Swaminathan explains in Science in 5"
    ,
    imgSrc : "assets/covid5.jpg",
  }
]
setData(){
  this.lineData = [];
  this.labels =[];
  this.selectedCountryDateDatacopy.forEach((element,index) => {
    this.labels.push(element.date);
    this.lineData.push (element.cases);

  });
  console.log(this.lineData,this.labels);



}
intitChart(){
  this.setData();
  // console.log(this.data);
  if(this.linechartJs){
    this.linechartJs.destroy();
  }

  this.linechartJs = new Chart('myLineChart2',  {
    type: 'line',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Countries Data',
        data:this.lineData,

        fill: true,

        borderColor: '#e74c3c',
        tension: 0.1,
      pointRadius:1,
      pointHitRadius:50,

      }]
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      }
    },
  });


}
constructor( private data_service :DataServiceService) {
};


ngOnInit(): void {
  merge(
  this.data_service.getdatedata().pipe(map((result)=>{

    this.dateWiseData=result;
  })),


  this.data_service.getdata().pipe(map((result)=>{
    this.data = result;
      this.data.forEach((e)=>{
        this.countries.push(e.country);
      }
      )
    }))
  ).subscribe({
    complete:()=>{
      this.isLoader = true;
      this.countrySet("Pakistan");

    }
  })



  }
  countrySet(value){
console.log("value "+ value);

    if( value != ""){

      this.pCountry = value;
      this.data.forEach((e)=>{

        if(e.country === this.pCountry){
          this.totalActive = e.active;
          this.totalConfirmed = e.confirmed;
          this.totalDeaths = e.deaths;
          this.totalRecovered = e.recovered;

      }
    });

    this.selectedCountryDateData=this.dateWiseData[this.pCountry];

    this.countryDateData =[];
    this.selectedCountryDateDatacopy = this.selectedCountryDateData;
    this.selectedCountryDateData.forEach((ele,index) => {
      let length = this.selectedCountryDateData.length-1;
      ele.date = ele.date.toUTCString().slice(0,16);

      this.countryDateData.push(this.selectedCountryDateData[length-index]);


    });


this.intitChart();


    }
  }

}
