import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }from '@angular/router';
import { Team, RecipesSearchService } from 'src/app/services/recipes-search.service';
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
    private teamService: RecipesSearchService,
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

    const idUser = localStorage.getItem('idUser') || '0';
    this.teamService.GetAllTeamsById(idUser).subscribe(
      (result) => {
        for(let i = 0; i<result.length; i++)
        {
          this.dataSourceC.data[i] = { jobType: "", availability: 0, actions:["Edit Employees"], id: 0};
        
          this.dataSourceC.data[i].jobType = result[i].jobType;
          this.dataSourceC.data[i].availability = result[i].availability;
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
  availability: number;
  actions: string[];
  id: number;

}

const ELEMENT_DATA: Element[] = [];
