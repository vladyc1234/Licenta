import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Location, RecipesSearchService } from 'src/app/services/recipes-search.service';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from  '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { } from 'google.maps'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./scss/main.scss', './scss/animate.scss']
})



export class HomeComponent implements OnInit {

  addressVector: Array<addressLatLng> = [];
  addressVectorC: Array<addressLatLng> = [];

  constructor(
    public http: HttpClient,
    private router: Router,
    private locationService: RecipesSearchService,
  ) { 
  }

  ngOnInit() {
    this.geocodeAddress();

  }

  // geocodeAddress() {
  //   const idUser = localStorage.getItem('idUser') || '0';
  //   this.locationService.GetAllContractsById(idUser).subscribe(
  //     async contracts => {
  //       for(let i = 0; i < contracts.length; i++)
  //       {
  //         this.locationService.GetAllLocationsById(contracts[i].id).subscribe(
  //           async locations => {
  //             for(let j = 0; j < locations.length; j++)
  //             {
  //               let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + locations[j].address + '%' + locations[j].city + '&key=AIzaSyAt6xg7q7ZAivgGRE6oOZKLjjZir-vdyMA'; 
  //               // this.http.get(url).subscribe(
  //               //   (result: any) => {
  //               //     let latitude = result['results'][0]['geometry']['location']['lat'];
  //               //     let longitude = result['results'][0]['geometry']['location']['lng'];
  //               //     let location: Array<number[]> = [];
  //               //     location.push([latitude, longitude]);
  //               //     this.addressVector.push({idContract: contracts[i].id, location: location, value: contracts[i].value});

                    
  //               //   }
  //               // )
  //               const result: any = await this.http.get(url).toPromise();
  //               let latitude = result['results'][0]['geometry']['location']['lat'];
  //               let longitude = result['results'][0]['geometry']['location']['lng'];
  //               let location: Array<number[]> = [];
  //               location.push([latitude, longitude]);
  //               this.addressVector.push({idContract: contracts[i].id, location: location, value: contracts[i].value});
  //               console.log(this.addressVector)
  //             }
  //           }
  //         )
  //       }
  //     }
  //   )
    
  // }

  async geocodeAddress() {
    const idUser = localStorage.getItem('idUser') || '0';
    var contracts = await this.locationService.GetAllContractsById(idUser).toPromise() 
    for(let i = 0; i < contracts.length; i++) 
    {
      var locations: any = await this.locationService.GetAllLocationsById(contracts[i].id).toPromise()
      for(let j = 0; j < locations.length; j++)
      {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + locations[j].address + '%' + locations[j].city + '&key=AIzaSyAt6xg7q7ZAivgGRE6oOZKLjjZir-vdyMA'; 
        const result: any = await this.http.get(url).toPromise();
        let latitude = result['results'][0]['geometry']['location']['lat'];
        let longitude = result['results'][0]['geometry']['location']['lng'];
        let locationName = result['results'][0]['formatted_address'];
        let location: Array<number[]> = [];
        location.push([latitude, longitude]);
        this.addressVector.push({idContract: contracts[i].id, locationNames: locationName, location: location, value: contracts[i].value});
        
      }
    }

    console.log(this.addressVector)    
    this.generateDistanceMatrix(); 
}

  async generateDistanceMatrix() {

    var destinations: Array<google.maps.LatLng> = [];
    var origins: Array<google.maps.LatLng> = [];

    for(let i = 0; i < this.addressVector.length; i++) 
    {
      for(let j = 0; j < this.addressVector[i].location.length; j++)
      {
        destinations.push(new google.maps.LatLng(this.addressVector[i].location[j][0], this.addressVector[i].location[j][1]));
        origins.push(new google.maps.LatLng(this.addressVector[i].location[j][0], this.addressVector[i].location[j][1]));
      }
    }

    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject)=>{
      matrix.getDistanceMatrix({
      origins: destinations,
      destinations: origins,
      travelMode: google.maps.TravelMode.DRIVING,
      }, function(response, status) {
        if(status === 'OK'){
          console.log(response)
        }else{
          console.log(response);
        }
      });
    })
    
  }
}

export interface addressLatLng {
  idContract: number;
  locationNames: string;
  location: Array<number[]>;
  value: number;
}

export interface matrixElement {
  distance: number;
  time: number;
}

export interface distanceMatrix {
  locations: addressLatLng;
  elements: Array<matrixElement>;
}


