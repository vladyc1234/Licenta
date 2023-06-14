import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Team, RouteManagerService } from 'src/app/services/route-manager.service';
import { AbstractControl, AbstractFormGroupDirective, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contract-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['scss/animate.scss', 'scss/main.scss']
})
export class TeamSearchComponent implements OnInit {

  public displayedColumns_teams = ['jobType','availability','actions'];
  public id = localStorage.getItem('link_id')||'1';

  constructor(
    private router: Router,
    private teamService: RouteManagerService,
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
    this.displayTeams();
  }

  public displayTeams(): void{

    const idUser = localStorage.getItem('idUser') || '0';
    this.teamService.GetAllTeamsById(idUser).subscribe(
      (result) => {
        for(let i = 0; i<result.length; i++)
        {
          this.dataSourceC.data[i] = { jobType: "", availability: "", actions:["Edit"], id: 0};
        
          this.dataSourceC.data[i].jobType = result[i].jobType;
          if(result[i].availability == 1)
          {
            this.dataSourceC.data[i].availability = "Available";
          } else {
            this.dataSourceC.data[i].availability = "Not available";
          }
          
          this.dataSourceC.data[i].id = result[i].id;
        }      
        this.dataSource = this.dataSourceC; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public addTeam(): void{
    let idUser = localStorage.getItem('idUser') || '0';
    if(this.addForm.value.jobType!=null)
    {
      let team = new Team(this.addForm.value.jobType, 1, parseInt(idUser));
    
      this.teamService.CreateTeam(team).subscribe(
        data => {
          console.log(data)
          localStorage.setItem('idTeam',data.id);
          window.location.reload();
        }
      )
    }
  }

  public deleteTeam(id: string): void{
    this.teamService.GetAllEmployeesById(id).subscribe(
      (employees) => {
        for(let i = 0; i < employees.length; i++) 
        {
          this.teamService.DeleteEmployee(employees[i].id).subscribe();
        }
      }
    )
    this.teamService.DeleteTeamById(id).subscribe();
    window.location.reload();
  }

  public addForm: FormGroup = new FormGroup({
    jobType: new FormControl(''),
  });

  get jobType(){
    return this.addForm.get('jobType');
  }

  public editEmployees(id:string): void{
    localStorage.setItem("idTeam", id);
    this.router.navigate(['/employee-edit']);
  }
  public logout(): void{
    localStorage.setItem('Role', 'Anonim');
    this.router.navigate(['/login']);
  }

}

export interface Element {
  jobType: string;
  availability: string;
  actions: string[];
  id: number;

}

const ELEMENT_DATA: Element[] = [];
