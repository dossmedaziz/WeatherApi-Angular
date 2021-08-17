import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data 
  constructor(private http : HttpClient) { }

  async  ngOnInit() {
  await  this.getCurretWeather()
        
  }




  async getCurretWeather()
  {
     navigator.geolocation.getCurrentPosition((pos)=>{
    let {latitude, longitude } = pos.coords;
     this.callApi(latitude,longitude)
      
    })

  }

  callApi(lat , long){
    this.http.get<any>(
      'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&exclude=hourly,minutely&units=metric&appid=ad81bceca20a3cf0686f774fd22c5b7a')
    .toPromise().
    then( data =>{
 
      this.data = data
      
       this.getCurrent()
      
              })
  }


  getCurrent()
  {
    let currentData = this.data     ? this.data.current : ''
    let result = {
      currentTime : new Date(currentData.dt*1000),
      humidity : currentData.humidity,
      pressure : currentData.pressure,
      sunrise : new Date(currentData.sunrise*1000) ,
      sunset : new Date(currentData.sunset*1000),
      wind_speed :  currentData.wind_speed,
      timezone : this.data.timezone,
      lat : this.data.lat,
      lon: this.data.lon
    }
    console.log(result);
    
    return result
    
  }
}
