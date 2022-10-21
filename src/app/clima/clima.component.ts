import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  lat!: number;
  lon!: number;
  weather: any;
  cityName: string = '';

  constructor(private weatherService: WeatherService) { }

 
  
  onSubmit(){
    this.getCity(this.cityName);
    this.cityName = '';
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
          console.log(this.weather)
        });
      });
    }
  }

  getCity(city: any) {
    this.weatherService.getWeatherDataByCityName(city).subscribe((data: any) => {
      this.weather = data;

      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
    });
  }

  getCoords(event: { coords: { lat: number; lon: number; }; }) {
    this.lat = event.coords.lat;
    this.lon = event.coords.lon;

    this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
      this.weather = data;
    });
  }

}