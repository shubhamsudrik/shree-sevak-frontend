import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Area } from 'src/app/Classes/Area';
import { AreaDataService } from 'src/app/services/area-data.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {


  area: Area = new Area();
  defaultAreas: any[] = [];
  // sortedDefaultLocations: any[] = []; 
  public focus;
  searchText= '';
  searchText1 ='';
  searchText2 ='';

    // Pagination
    currentPage: number = 0;
    itemsPerPage: number = 10;


  constructor(
    private areaDataService:AreaDataService,
    private router:Router,
  
  ) {}

  ngOnInit(): void {

    this.getAreaList();
  }

  get pagedAreas():any[] {
    const startIndex = this.currentPage*this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultAreas.slice(startIndex,endIndex);
  }

  onPageChange(event:PageEvent):void{
    this.currentPage = event.pageIndex;
  }

  private getAreaList(){
    this.areaDataService.getAllAreaList().subscribe((areaList) =>{
this.defaultAreas=areaList;
console.log(this.defaultAreas);
  },(error=>{
    console.log(error);
  }))
  }

  public statusAreas(status:string){
    if(status=="all"){
      this.getAreaList();

    }else{
      this.areaDataService.getAreaByStatus(status).subscribe((areaList:Area[])=>{
        this.defaultAreas = areaList
        console.log(areaList)
      },(error)=>{
        console.error("fetching area details ", error)
      })
    }
  }

  toggleButtons(operation:string, area:any){
    if(operation==='edit'){
      area.isEditing = true;
      area.isDeleting = true;

    }
  }
  updateArea(areaId: number) {
    this.router.navigate(['/create-area', areaId]);
  }
  onOpen() {
    console.log(this.area);
    this.router.navigate(['/create-area']);
  }
}
