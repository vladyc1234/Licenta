import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Location, RecipesSearchService } from 'src/app/services/recipes-search.service';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from  '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { } from 'google.maps'; 
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./scss/main.scss', './scss/animate.scss']
})



export class HomeComponent implements OnInit {

  addressVector: Array<addressLatLng> = [];
  addressVectorC: Array<addressLatLng> = [];
  distanceMatrix: Array<distanceMatrix> = [];

  posStartDate: any = 0;
  startDate: any = 0;
  finishDate: any = 0;

  loader = new Loader({
    apiKey: "&key=AIzaSyAt6xg7q7ZAivgGRE6oOZKLjjZir-vdyMA",
    version: "weekly",
  });
  

  constructor(
    public http: HttpClient,
    private router: Router,
    private homeService: RecipesSearchService,
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
    var contracts = await this.homeService.GetAllContractsById(idUser).toPromise() 

    this.startDate = new Date(contracts[0].startDate);
    this.finishDate = new Date(contracts[0].finishDate)

    for(let i = 0; i < contracts.length; i++) 
    {
      
      let contractStartDate = new Date(contracts[i].startDate);
      let contractFinishDate = new Date(contracts[i].finishDate);
        
      if(contractStartDate < this.startDate)
      {
        this.startDate = contracts[i].startDate;
        this.posStartDate = i;
      }
      if(contractFinishDate > this.finishDate) 
      {
        this.finishDate = contractFinishDate;
      }
      
      var locations: any = await this.homeService.GetAllLocationsById(contracts[i].id).toPromise()
      for(let j = 0; j < locations.length; j++)
      {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + locations[j].address + '%' + locations[j].city + '&key=AIzaSyAt6xg7q7ZAivgGRE6oOZKLjjZir-vdyMA'; 
        const result: any = await this.http.get(url).toPromise();
        let latitude = result['results'][0]['geometry']['location']['lat'];
        let longitude = result['results'][0]['geometry']['location']['lng'];
        let locationName = result['results'][0]['formatted_address'];
        let location: Array<number[]> = [];
        location.push([latitude, longitude]);
        this.addressVector.push({idContract: contracts[i].id, startDate: contracts[i].startDate, finishDate: contracts[i].finishDate, locationNames: locationName, location: location, value: contracts[i].value});
        
      }
    }

    
    this.loader.load().then(() => {
      this.generateDistanceMatrix();
    });

    

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
    
    return await new Promise((resolve, reject)=>{
      matrix.getDistanceMatrix({
      origins: destinations,
      destinations: origins,
      travelMode: google.maps.TravelMode.DRIVING,
      }, (response:any, status) => {
        if(status === 'OK'){
          for(let i = 0; i < this.addressVector.length; i++)
          {
            let matrixRow: Array<matrixElement> = [];
            for(let j = 0; j < response["rows"][i]["elements"].length; j++)
            {
              matrixRow[j] = {distance: response["rows"][i]["elements"][j]["distance"]["value"], duration: response["rows"][i]["elements"][j]["duration"]["value"]};
            }
            this.distanceMatrix[i] = {locations: this.addressVector[i], elements: matrixRow};
          }
          console.log(this.distanceMatrix)
          const fastestRoute = this.calculateFastestRoute();
          console.log(fastestRoute)
        }
      });
    })

    
    
  }

  // getStartingAndFinishDateContracts(): any[] {
  //   let dates: any[];
  //   let posStartDate = 0;
  //   let posFinishDate = 0;
  //   let finishDate = new Date(2000, 1, 1);
  //   const idUser = localStorage.getItem('idUser') || '0';
  //   this.homeService.GetAllContractsById(idUser).subscribe(
  //     (contracts) => {
  //       let startDate = new Date(contracts[0].startDate);
  //       let finishDate = new Date(contracts[0].finishDate);
  //       for(let i = 0; i < contracts.length; i++)
  //       {
  //         let contractStartDate = new Date(contracts[i].startDate);
  //         let contractFinishDate = new Date(contracts[i].finishDate);
          
  //         if(contractStartDate < startDate)
  //         {
  //           startDate = contracts[i].startDate;
  //           posStartDate = i;
  //         }
  //         if(contractFinishDate > finishDate)
  //         {
  //           finishDate = contracts[i].finishDate;
  //           posFinishDate = i;
  //           console.log(posFinishDate)
  //         }
  //       }
  //       dates = [posStartDate, posFinishDate]
  //       return dates;
  //     })
  
    
  // }

  // find the index of the closest unvisited location to the given location
  findClosest(locationIndex: number, visited: Set<number>): number {
    let minDistance = Infinity;
    let closestIndex = -1;
    
    for (let i = 0; i < this.distanceMatrix.length; i++) {
      if (!visited.has(i) && locationIndex != i) {
        let distance = this.distanceMatrix[locationIndex].elements[i].distance / this.distanceMatrix[i].locations.value;
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
    }
    return closestIndex;
  }

  // calculate the fastest route using a greedy approach
  calculateFastestRoute(): number[] {
    const route: number[] = [this.posStartDate];
    const visited: Set<number> = new Set([this.posStartDate]);
    let currentDate = new Date(this.distanceMatrix[route[route.length - 1]].locations.finishDate)
    let finishDate = new Date(this.finishDate)
    while (currentDate.getDate() != finishDate.getDate() && currentDate.getDay() != finishDate.getDay() && currentDate.getFullYear() == finishDate.getFullYear()) {
      const currentLocation = route[route.length - 1];
      const closestLocation = this.findClosest(currentLocation, visited);
      route.push(closestLocation);
      visited.add(closestLocation);
      currentDate = new Date(this.distanceMatrix[route[route.length - 1]].locations.finishDate)
    }
    return route;
  }

}

export interface addressLatLng {
  idContract: number;
  startDate: Date;
  finishDate: Date;
  locationNames: string;
  location: Array<number[]>;
  value: number;
}

export interface matrixElement {
  distance: number;
  duration: number;
}

export interface distanceMatrix {
  locations: addressLatLng;
  elements: Array<matrixElement>;
}


