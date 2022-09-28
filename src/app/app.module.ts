import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { CountriesComponent } from './Components/countries/countries.component';
import { HttpClientModule } from '@angular/common/http';
import { DashCardsComponent } from './Components/dash-cards/dash-cards.component';
import { SliderComponent } from './Components/slider/slider.component';
import { FooterComponent } from './Components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashCardsComponent,
    SliderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
