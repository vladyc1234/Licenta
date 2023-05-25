import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from  '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipesSearchService {

  //PRIMARY TABLE LINKS

  public url_contract = 'https://localhost:44379/api/Contract';
  public url_contract_id = 'https://localhost:44379/api/Contract';
  public url_location = 'https://localhost:44379/api/Location'
  public url_team = 'https://localhost:44379/api/Team'
  public url_employee = 'https://localhost:44379/api/Employee'

  constructor(
    public http: HttpClient,
  ) { }
  

  //GET FUNCTIONS

  public GetAllContracts(): Observable<any> {
    return this.http.get(`${this.url_contract}`);
  }

  public GetContractById(id:string): Observable<any> {
    return this.http.get(`${this.url_contract}/${id}`);
  }

  public GetAllContractsById(id:string): Observable<any> {
    return this.http.get(`${this.url_contract}/contractsById/${id}`);
  }

  public GetAllLocations(): Observable<any> {
    return this.http.get(`${this.url_location}`);
  }

  public GetAllLocationsById(id:string): Observable<any> {
    return this.http.get(`${this.url_location}/${id}`);
  }

  public DeleteLocation(id:string): Observable<any> {
    return this.http.delete(`${this.url_location}/${id}`);
  }

  public GetAllTeams(): Observable<any> {
    return this.http.get(`${this.url_team}`);
  }

  public GetTeamById(id:string): Observable<any> {
    return this.http.get(`${this.url_team}/${id}`);
  }

  public GetAllTeamsById(id:string): Observable<any> {
    return this.http.get(`${this.url_team}/teamsById/${id}`);
  }

  public GetAllEmployees(): Observable<any> {
    return this.http.get(`${this.url_employee}`);
  }

  public GetAllEmployeesById(id:string): Observable<any> {
    return this.http.get(`${this.url_employee}/${id}`);
  }

  public DeleteEmployee(id:string): Observable<any> {
    return this.http.delete(`${this.url_employee}/${id}`);
  }

  //POST FUNCTIONS FOR PRIMARY TABLES

  public CreateContract(contract: Contract): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(contract);
    console.log(body)
    return this.http.post(this.url_contract, body,{'headers':headers})
  }

  public CreateLocation(location: Location): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(location);
    console.log(body)
    return this.http.post(this.url_location, body,{'headers':headers})
  }

  public CreateTeam(team: Team): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(team);
    console.log(body)
    return this.http.post(this.url_team, body,{'headers':headers})
  }

  public CreateEmployee(employee: Employee): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(employee);
    console.log(body)
    return this.http.post(this.url_employee, body,{'headers':headers})
  }

}

//CLASSES FOR PRIMARY TABLES

export class Contract{
  startDate: Date;
  finishDate: Date;
  value: number;
  idUser: number;

  constructor(startDate: Date, finishDate: Date, value: number, idUser: number){
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.value = value;
    this.idUser = idUser;
  };
}

export class Location{
  city: string;
  address: string;
  idContract: number;

  constructor(city: string, address: string, idContract: number){
    this.city = city;
    this.address = address;
    this.idContract = idContract;
  };
}

export class Team{
  jobType: string;
  availability: number;
  idUser: number;

  constructor(jobType: string, availability: number, idUser: number){
    this.jobType = jobType;
    this.availability = availability;
    this.idUser = idUser;
  };
}

export class Employee{
  lastName: string;
  name: string;
  idTeam: number;

  constructor(lastName: string, name: string, idTeam: number){
    this.lastName = lastName;
    this.name = name;
    this.idTeam = idTeam;
  };
}
