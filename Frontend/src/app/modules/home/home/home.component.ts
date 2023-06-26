import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Location, RouteManagerService } from 'src/app/services/route-manager.service';
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
  distanceMatrix: Array<distanceMatrix> = [];

  posStartDate: any = 0;
  startDate: any = 0;
  finishDate: any = 0;
  visitedLocations: Set<number> = new Set();
  
  loader = new Loader({
    apiKey: "&key=AIzaSyAt6xg7q7ZAivgGRE6oOZKLjjZir-vdyMA",
    version: "beta",
  });
  
  constructor(
    public http: HttpClient,
    private router: Router,
    private homeService: RouteManagerService,
  ) { 
  }

  ngOnInit() {
    this.geocodeAddress();
  }

  async geocodeAddress() {
    const idUser = localStorage.getItem('idUser') || '0';
    var contracts = await this.homeService.GetAllContractsById(idUser).toPromise() 

    for(let i = 0; i < contracts.length; i++) 
    {
      
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

        let usable = 0;
        this.homeService.GetAllLocationsById(contracts[i].id).subscribe(
          (result) => {
            
            if(result.length != 0)
            {
              usable = 1;
            }

            if(usable == 1)
            {
              this.addressVector.push({idContract: contracts[i].id, startDate: contracts[i].startDate, finishDate: contracts[i].finishDate, locationNames: locationName, location: location, value: contracts[i].value, type: contracts[i].jobType});
            }
          })
      }
    }

    this.loader.load().then(() => {
      this.generateDistanceMatrix();
    });

}

async generateDistanceMatrix() {

    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const matrix = new google.maps.DistanceMatrixService();
    let directionsService = new google.maps.DirectionsService();
    let geocoder = new google.maps.Geocoder();

    const container : any = document.getElementById('mapContainer');

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
    
    return await new Promise(()=>{
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

          const idUser = localStorage.getItem('idUser') || '0';
          this.homeService.GetAllTeamsById(idUser).subscribe(
            (teams) => {

              for(let teamIndex = 0; teamIndex < teams.length; teamIndex++)
              {

                this.startDate = new Date(this.addressVector[0].startDate);
                this.startDate = new Date(9999, 12, 30);
                this.finishDate = new Date(this.addressVector[0].finishDate);
                for(let i = 0; i < this.addressVector.length; i++)
                {
                  let contractStartDate = new Date(this.addressVector[i].startDate);
                  let contractFinishDate = new Date(this.addressVector[i].finishDate);

                  console.log(teams[teamIndex].jobType)

                  if(teams[teamIndex].jobType.toLocaleLowerCase() == "special" && contractStartDate < this.startDate && !this.visitedLocations.has(i) && this.distanceMatrix[i].locations.type.toLocaleLowerCase() == "special")
                  {
                    this.startDate = new Date(this.addressVector[i].startDate);
                    this.posStartDate = i;
                  }
                  
                  if(teams[teamIndex].jobType.toLocaleLowerCase() == "general" && contractStartDate < this.startDate && !this.visitedLocations.has(i) && this.distanceMatrix[i].locations.type.toLocaleLowerCase() != "special")
                  {
                    this.startDate = new Date(this.addressVector[i].startDate);
                    this.posStartDate = i;
                  }
                    
                  if(contractFinishDate >= this.finishDate && !this.visitedLocations.has(i))
                  {
                    this.finishDate = this.addressVector[i].finishDate;
                  }
                }

                if(this.visitedLocations.has(this.posStartDate))
                {
                  for(let i = 0; i < this.addressVector.length; i++)
                  {
                    let contractStartDate = new Date(this.addressVector[i].startDate);
                    let contractFinishDate = new Date(this.addressVector[i].finishDate);

                    if(contractStartDate <= this.startDate && !this.visitedLocations.has(i))
                    {
                      this.startDate = new Date(this.addressVector[i].startDate);
                      this.posStartDate = i;
                    }

                  }
                }

                this.visitedLocations.add(this.posStartDate);

                const fastestRoute = this.calculateFastestRoute(teams[teamIndex].jobType);
                console.log(fastestRoute)
                
                let value = 0;

                for(let routeIndex = 0; routeIndex < fastestRoute.length - 1; routeIndex++)
                {
                  value = value + this.distanceMatrix[fastestRoute[routeIndex]].locations.value
                }

                const containerAll = document.createElement('div');
                const stylesContainer = `
                  display: flex;
                  flex-direction: row;
                  justify-content: center; 
                  align-items: center;
                `;
                containerAll.setAttribute('style', stylesContainer);
                container.appendChild(containerAll);

                const newDiv = document.createElement('div');
                const styles = `
                    height: 400px; 
                    width: 70%; 
                    margin-bottom: 5%;
                    margin-right: 5%;
                    border: 3px solid black;
                `;
                newDiv.setAttribute('style', styles);
                containerAll.appendChild(newDiv);

                const containerInfo = document.createElement('div');
                containerAll.appendChild(containerInfo);

                const team = document.createElement('div');
                team.textContent = "Team " + teamIndex.toString() + " with the training level: " + teams[teamIndex].jobType.toLocaleLowerCase();
                const stylesTeam = `
                    margin-bottom: 3%;
                `;
                team.setAttribute('style', stylesTeam);
                containerInfo.appendChild(team);

                const profit = document.createElement('div');
                profit.textContent = "The projected value of this route is equal to: " + value.toString();
                const stylesProfit = `
                    margin-bottom: 3%;
                `;
                profit.setAttribute('style', stylesProfit);
                containerInfo.appendChild(profit);

                const route = document.createElement('div');
                route.textContent = "The route goes trough the following locations: ";
                const stylesRoute = `
                    margin-bottom: 3%;
                `;
                route.setAttribute('style', stylesRoute);
                containerInfo.appendChild(route);

                for(let routePoint = 0; routePoint < fastestRoute.length - 1; routePoint++)
                {
                  const location = document.createElement('div');
                  location.textContent = this.distanceMatrix[fastestRoute[routePoint]].locations.locationNames + 
                  " (Contract " + this.distanceMatrix[fastestRoute[routePoint]].locations.idContract + 
                  ", type " + this.distanceMatrix[fastestRoute[routePoint]].locations.type.toLocaleLowerCase() + " )";
              
                  const stylesLocation = `
                    margin-bottom: 1%;
                    font-size: 14px;
                  `;
                  location.setAttribute('style', stylesLocation);
                  containerInfo.appendChild(location);
                }

                let directionsRenderer = new google.maps.DirectionsRenderer();
                
                geocoder.geocode( { 'address': this.distanceMatrix[fastestRoute[0]].locations.locationNames}, (results : any, status) => {
                  if (status == 'OK') {
                    let map = new Map(
                      newDiv as HTMLElement,
                      {
                        zoom: 4,
                        center: results[0].geometry.location,
                      }
                    );
    
                    directionsRenderer.setMap(map);
                  }
                });

                let waypoints = []

                for(let routeIndex = 1; routeIndex < fastestRoute.length - 1; routeIndex++)
                {
                  let stop = {location: this.distanceMatrix[fastestRoute[routeIndex]].locations.locationNames, stopover: true}
                  waypoints.push(stop)
                }
                
                if (fastestRoute.length == 2)
                {
                  directionsService.route(
                    {
                      origin: this.distanceMatrix[fastestRoute[0]].locations.locationNames,
                      destination: this.distanceMatrix[fastestRoute[0]].locations.locationNames,
                      provideRouteAlternatives: false,
                      travelMode: google.maps.TravelMode["DRIVING"],
                      drivingOptions: {
                        departureTime: new Date(),
                        trafficModel: google.maps.TrafficModel["PESSIMISTIC"]
                      },
                    }, (result) => {
                    if (1) {
                      directionsRenderer.setDirections(result);
                    }
                  });
                }
                else if (fastestRoute.length == 3)
                {
                  directionsService.route(
                    {
                      origin: this.distanceMatrix[fastestRoute[0]].locations.locationNames,
                      destination: this.distanceMatrix[fastestRoute[1]].locations.locationNames,
                      provideRouteAlternatives: false,
                      travelMode: google.maps.TravelMode["DRIVING"],
                      drivingOptions: {
                        departureTime: new Date(),
                        trafficModel: google.maps.TrafficModel["PESSIMISTIC"]
                      },
                    }, (result) => {
                    if (1) {
                      directionsRenderer.setDirections(result);
                    }
                  });
                }
                else 
                {
                  directionsService.route(
                    {
                      origin: this.distanceMatrix[fastestRoute[0]].locations.locationNames,
                      destination: this.distanceMatrix[fastestRoute[fastestRoute.length - 2]].locations.locationNames,
                      waypoints: waypoints,
                      provideRouteAlternatives: false,
                      travelMode: google.maps.TravelMode["DRIVING"],
                      drivingOptions: {
                        departureTime: new Date(),
                        trafficModel: google.maps.TrafficModel["PESSIMISTIC"]
                      },
                    }, (result) => {
                    if (1) {
                      directionsRenderer.setDirections(result);
                    }
                  });
                }

              }

            })
        }
      });
    })

    
    
  }

  findClosest(locationIndex: number, visited: Set<number>, teamType: string): number {
    let minDistance = Infinity;
    let closestIndex = -1;
    let specialActive = 0;
    
    for (let i = 0; i < this.distanceMatrix.length; i++) {

      if (!visited.has(i) && locationIndex != i && this.distanceMatrix[i].locations.startDate >= this.distanceMatrix[locationIndex].locations.finishDate && teamType.toLocaleLowerCase() == "special" && this.distanceMatrix[i].locations.type.toLocaleLowerCase() == "special") {
        let distance = this.distanceMatrix[locationIndex].elements[i].distance / this.distanceMatrix[i].locations.value;
        specialActive = 1;

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      if (!visited.has(i) && locationIndex != i && this.distanceMatrix[i].locations.startDate >= this.distanceMatrix[locationIndex].locations.finishDate && specialActive == 0) {
        let distance = this.distanceMatrix[locationIndex].elements[i].distance / this.distanceMatrix[i].locations.value;

        if (teamType.toLocaleLowerCase() == "general" && this.distanceMatrix[i].locations.type.toLocaleLowerCase() != "special")
        {
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        } 
        else 
        {
          if (distance < minDistance && teamType.toLocaleLowerCase() == "special") {
            minDistance = distance;
            closestIndex = i;
          }
        }
          
      }
    }
    return closestIndex;
  }

  calculateFastestRoute(teamType : string): number[] {
    const route: number[] = [this.posStartDate];
    let currentDate = new Date(this.distanceMatrix[route[route.length - 1]].locations.finishDate);
    let finishDate = new Date(this.finishDate);

    while (1) {
      const currentLocation = route[route.length - 1];
      const closestLocation = this.findClosest(currentLocation, this.visitedLocations, teamType);
      route.push(closestLocation);

      if(route[route.length - 1] == -1)
      {
        break;
      }

      this.visitedLocations.add(closestLocation);
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
  type: string;
}

export interface matrixElement {
  distance: number;
  duration: number;
}

export interface distanceMatrix {
  locations: addressLatLng;
  elements: Array<matrixElement>;
}


