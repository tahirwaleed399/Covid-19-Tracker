import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/globaldata';
import { DataServiceService } from 'src/app/Services/data-service.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
totalActive:any ="Loading...";
totalConfirmed:any ="Loading...";
totalDeaths:any ="Loading...";
totalRecovered:any ="Loading...";
dataTable:any;
data:any = [12, 19, 3, 5, 2, 3];
labels :any=[];
piechartJs:any;
linechartJs:any;
isLoader:boolean = false;
globalDataSummary : GlobalDataSummary[]=[];
sliderObject = [
  {
    heading : "Most Danjerous Disease In The World",
    para : " Effected the mosst of th countries of whole world so we are covering the whole world to provide you data about it"
    ,
    imgSrc : "assets/covid2.jpg",
  }, {
    heading : "We Provide the best doctors to fight with it",
    para : " Covid Cases are increasing day by day so please follow the sops provided and Be Safe and Happy !"
    ,
    imgSrc : "assets/covid3.jpg",
  }
]
setData(Case:string){
  this.data = [];
  this.labels = [];
this.globalDataSummary.forEach((cs)=>{
  if (cs.confirmed >= 3000000) {
   this.labels.push(cs.country);
   if(Case === "c"){
    this.data.push(cs.confirmed)
        }  else if(Case === "a"){

          this.data.push(cs.active)
        }else  if(Case === "d"){

          this.data.push(cs.deaths)
              }else if(Case === "r"){

                this.data.push(cs.recovered)
                    }else{
          console.log("nothing");
  }

}})
console.log(this.data);

}
initChartjs(){
  this.setData("c")
this.piechartJs = new Chart('myChart', {
    type: 'pie',
    data: {
        labels:this.labels,
        datasets: [{
            label: '# of Votes',
            data: this.data,
            backgroundColor: [
                '#fad390',
                '#6a89cc',
                '#82ccdd','#b8e994',
                '#f6b93b',
                '#e55039',
                '#fff200',
                '#78e08f',
                '#eb2f06',
                '#f6b93b'
                ],
            borderColor: [

                '#fad390',
                '#6a89cc',
                '#82ccdd','#b8e994',
                '#f6b93b',
                '#e55039',
                '#fff200',
                '#78e08f',
                '#eb2f06',
                '#f6b93b'
            ],
            borderWidth: 1
        }]
    },
    options: {

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
this.linechartJs = new Chart('myLineChart',  {
  type: 'line',
  data: {
    labels: this.labels,
    datasets: [{
      label: 'World Data',
      data:this.data,

      fill: true,

      borderColor: '#05c46b',
      tension: 0.1
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


constructor(private data_service :DataServiceService) {

}

ngOnInit(): void {



  this.data_service.getdata().subscribe(
      {
        next:(result)=>{
          this.globalDataSummary= result;
          this.totalActive= 0;
          this.totalRecovered= 0;
          this.totalDeaths= 0;
          this.totalConfirmed= 0;



          result.forEach(e => {
        if (!Number.isNaN(e.active)) {
          this.totalActive+= e.active;
          this.totalRecovered+= e.recovered;
          this.totalDeaths+= e.deaths;
          this.totalConfirmed+= e.confirmed;
        }


      });
  this.initChartjs();

      // this.initchart('a');
    }
  ,
  complete:()=>{
      this.isLoader=true;
      console.log(this.isLoader);

  }
  })

  }


  updateChart(chart) {
  chart.data.datasets.forEach((dataset) => {
      dataset.data=this.data;
  });
  chart.update();
}
updateChartJS(ele:HTMLInputElement){
  let val = ele.value;
  this.setData(val);
  this.updateChart(this.piechartJs);
  this.updateChart(this.linechartJs);
}

}
