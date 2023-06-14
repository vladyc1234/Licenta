import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Employee, RouteManagerService } from 'src/app/services/route-manager.service';
import { AbstractControl, AbstractFormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contract-search',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['scss/animate.scss', 'scss/main.scss']
})
export class EmployeeEditComponent implements OnInit {

  public displayedColumns_employee = ['lastName','name','actions'];
  public id = localStorage.getItem('link_id')||'1';
  

  constructor(
    private router: Router,
    private employeeService: RouteManagerService,
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
    this.displayEmployees();
  }

  public displayEmployees(): void{
    let idTeam = localStorage.getItem('idTeam') || '0';
    this.employeeService.GetAllEmployeesById(idTeam).subscribe(
      (result) => {
        for(let i = 0; i<result.length; i++)
        {
          this.dataSourceC.data[i] = { lastName: "", name: "", actions:["Delete"], id: 0};
          this.dataSourceC.data[i].lastName = result[i].lastName;
          this.dataSourceC.data[i].name = result[i].name;
          this.dataSourceC.data[i].id = result[i].id;
        }      
        this.dataSource = this.dataSourceC; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public addEmployee(): void{
    let idTeam = localStorage.getItem('idTeam') || '0';
    if(this.addForm.value.lastName != null && this.addForm.value.name != null)
    {
      let employee = new Employee(this.addForm.value.lastName, this.addForm.value.name, parseInt(idTeam));
    
      this.employeeService.CreateEmployee(employee).subscribe(
        data => {
          console.log(data)
          window.location.reload();
        }
      )

      
    }
    
  }

  public deleteEmployee(id: string): void{
    this.employeeService.DeleteEmployee(id).subscribe();
    window.location.reload();
  }

  public addForm: FormGroup = new FormGroup({
    lastName: new FormControl(''),
    name: new FormControl(''),
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
  lastName: string;
  name: string;
  actions: string[];
  id: number;

}

const ELEMENT_DATA: Element[] = [];
