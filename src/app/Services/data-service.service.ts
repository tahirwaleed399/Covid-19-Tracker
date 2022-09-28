import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/globaldata';
import {DateWiseData} from '../models/globalDateData';
import { RoutesRecognized } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-16-2021.csv`;
  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
  constructor(private http: HttpClient) {
    console.log(this.http);
  }

  getdatedata() {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text' })
      .pipe(map(result => {
      let rows = result.split('\n');
      let mainData={};
      let header = rows[0].split(/,(?=\S)/);
      header.splice(0,4)
     rows.splice(0,1)



rows.forEach((row,index)=>{

  let cols=row.split(/,(?=\S)/);
  let con = cols[1];
  cols.splice(0,4)


  mainData[con]=[];
  if (con) {

    header.forEach((date,i)=>{




    let temp:DateWiseData={};
    temp['Country']=con;
    temp['date'] = new Date(Date.parse(date)) ;
    temp['cases'] = +cols[i];
    mainData[con].push(temp)
   })
  }

});
// console.log(mainData);


        return mainData;
      }))
  } getdata() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach((row) => {
          let col = row.split(/,(?=\S)/);

         let cs ={
            country: col[3],
            confirmed: +col[7],
            deaths: +col[8],
            recovered: +col[9],
            active: +col[10],
          };

let temp : GlobalDataSummary = raw[cs.country];
if (temp) {
temp.active = cs.active + temp.active;
temp.confirmed = cs.confirmed + temp.confirmed
  temp.deaths = cs.deaths + temp.deaths
  temp.recovered = cs.recovered + temp.recovered
  raw[cs.country] = temp;

}else{
  raw[cs.country]= cs;
}
 });



        return <GlobalDataSummary[]>Object.values(raw);
      })
    );
  }
}

