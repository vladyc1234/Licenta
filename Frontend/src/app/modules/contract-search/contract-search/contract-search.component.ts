import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Contract, RecipesSearchService } from 'src/app/services/recipes-search.service';
import { AbstractControl, AbstractFormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contract-search',
  templateUrl: './contract-search.component.html',
  styleUrls: ['scss/animate.scss', 'scss/main.scss']
})
export class ContractSearchComponent implements OnInit {

  public displayedColumns_contracts = ['startDate','finishDate','value','usable','actions'];
  public id = localStorage.getItem('link_id')||'1';

  constructor(
    private router: Router,
    private contractService: RecipesSearchService,
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
    this.displayContracts();
  }

  public displayContracts(): void{

    const options = { day: 'numeric', month: 'long', year: 'numeric'  };
    const idUser = localStorage.getItem('idUser') || '0';
    this.contractService.GetAllContractsById(idUser).subscribe(
      (result) => {
        for(let i = 0; i<result.length; i++)
        {
          this.dataSourceC.data[i] = { startDate: new Date(), finishDate: new Date(), value: 0, usable:"No", actions:["Edit"], id: 0};
          result[i].startDate = new Date(result[i].startDate);
          result[i].finishDate = new Date(result[i].finishDate);
          this.dataSourceC.data[i].startDate = result[i].startDate.toLocaleDateString('en-US', options);
          this.dataSourceC.data[i].finishDate = result[i].finishDate.toLocaleDateString('en-US', options);
          this.dataSourceC.data[i].value = result[i].value;

          this.contractService.GetAllLocationsById(result[i].id).subscribe(
            (result) => {
              if(result.length != 0)
              {
                this.dataSourceC.data[i].usable = "Usable";
              } else {
                this.dataSourceC.data[i].usable = "Not Usable"
              }
            }
          )

          this.dataSourceC.data[i].id = result[i].id;
        }      
        this.dataSource = this.dataSourceC; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public addContract(): void{
    let idUser = localStorage.getItem('idUser') || '0';
    if(this.addForm.value.startDate!=null && this.addForm.value.finishDate != null && this.addForm.value.value != null && this.addForm.value.finishDate > this.addForm.value.startDate)
    {
      let contract = new Contract(this.addForm.value.startDate, this.addForm.value.finishDate, this.addForm.value.value, parseInt(idUser));
    
      this.contractService.CreateContract(contract).subscribe(
        data => {
          console.log(data)
          localStorage.setItem('idContract',data.id);
          window.location.reload();
        }
      )
    }
  }

  public deleteContract(id: string): void{
    this.contractService.GetAllEmployeesById(id).subscribe(
      (locations) => {
        for(let i = 0; i < locations.length; i++) 
        {
          this.contractService.DeleteLocation(locations[i].id).subscribe();
        }
      }
    )
    this.contractService.DeleteContractById(id).subscribe();
    window.location.reload();
  }

  public addForm: FormGroup = new FormGroup({
    startDate: new FormControl(''),
    finishDate: new FormControl(''),
    value: new FormControl(''),
  });

  get startDate(){
    return this.addForm.get('startDate');
  }
  get finishDate(){
    return this.addForm.get('finishDate');
  }
  get value(){
    return this.addForm.get('value');
  }

  public editLocation(id:string): void{
    localStorage.setItem("idContract", id);
    this.router.navigate(['/location-edit']);
  }
  public logout(): void{
    localStorage.setItem('Role', 'Anonim');
    this.router.navigate(['/login']);
  }

}

export interface Element {
  startDate: Date;
  finishDate: Date;
  value: number;
  usable: string;
  actions: string[];
  id: number;

}

const ELEMENT_DATA: Element[] = [];
