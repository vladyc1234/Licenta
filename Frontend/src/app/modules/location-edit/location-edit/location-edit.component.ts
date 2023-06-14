import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Location, RouteManagerService } from 'src/app/services/route-manager.service';
import { AbstractControl, AbstractFormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contract-search',
  templateUrl: './location-edit.component.html',
  styleUrls: ['scss/animate.scss', 'scss/main.scss']
})
export class LocationEditComponent implements OnInit {

  public displayedColumns_location = ['city','address','actions'];
  public id = localStorage.getItem('link_id')||'1';
  

  constructor(
    private router: Router,
    private locationService: RouteManagerService,
  ) { }

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  dataSourceC = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.displayLocation();
  }

  public displayLocation(): void{
    let idContract = localStorage.getItem('idContract') || '0';
    this.locationService.GetAllLocationsById(idContract).subscribe(
      (result) => {
        for(let i = 0; i<result.length; i++)
        {
          this.dataSourceC.data[i] = { city: "", address: "", actions:["Delete"], id: 0};
          this.dataSourceC.data[i].city = result[i].city;
          this.dataSourceC.data[i].address = result[i].address;
          this.dataSourceC.data[i].id = result[i].id;
        }      
        this.dataSource = this.dataSourceC; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public addLocation(): void{
    let idContract = localStorage.getItem('idContract') || '0';
    if(this.addForm.value.city != null && this.addForm.value.address != null)
    {
      let location = new Location(this.addForm.value.city, this.addForm.value.address, parseInt(idContract));
    
      this.locationService.CreateLocation(location).subscribe(
        data => {
          console.log(data)
          window.location.reload();
        }
      )

      
    }
    
  }

  public deleteLocation(id: string): void{
    this.locationService.DeleteLocation(id).subscribe();
    window.location.reload();
  }

  public addForm: FormGroup = new FormGroup({
    city: new FormControl(''),
    address: new FormControl(''),
  });

  get city(){
    return this.addForm.get('city');
  }
  get address(){
    return this.addForm.get('address');
  }

  public logout(): void{
    localStorage.setItem('Role', 'Anonim');
    this.router.navigate(['/login']);
  }

}

export interface Element {
  city: string;
  address: string;
  actions: string[];
  id: number;

}

const ELEMENT_DATA: Element[] = [];
