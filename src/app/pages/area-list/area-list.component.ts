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
    query: string;
    status: string;
    pageSize: number;
    hasNextPage: any;
    totalElements: any;


  constructor(
    private areaDataService:AreaDataService,
    private router:Router,
  
  ) {}

  ngOnInit(): void {
this.getPaginateAreaListBaseOnSearch();
  }

  // record count
  get pagedLocations(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultAreas.slice(startIndex, endIndex);
  }


  get pagedAreas():any[] {
    const startIndex = this.currentPage*this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.defaultAreas.slice(startIndex,endIndex);
  }

  onPageChange(event:PageEvent):void{
    this.currentPage = event.pageIndex;
    this.getAllAreaListByPagination();
  }

//   private getAreaList(){
//     this.areaDataService.getAllAreaList().subscribe((areaList) =>{
// this.defaultAreas=areaList;
// console.log("areaList",areaList)
// console.log(this.defaultAreas);
//   },(error=>{
//     console.log(error);
//   }))
//   }

      private getAllAreaListByPagination(){
      this.areaDataService.getAllAreaListByPagination(this.currentPage, this.itemsPerPage ).subscribe((areaList: any) =>{
      this.defaultAreas=areaList.content;
      this.totalElements=areaList.totoalElement;
      console.log("totalElements",this.totalElements);
      console.log("areaList",areaList)
      console.log("areaList",areaList.content);
      console.log(this.defaultAreas);
    },(error=>{
      console.log(error);
    }))
    }

  public statusAreas(status:string){
    if(status=="all"){
      this.status=null
      this.query=null
      this.getAllAreaListByPagination();

    }else{
      this.status=status
    this.query=null
    this.currentPage=0,
    this.getPaginateAreaListBaseOnSearch();
    }
  }
  getPaginateAreaListBaseOnSearch(){
    this.currentPage=0
    this.areaDataService.getPaginateAreaListBaseOnSearch(this.query,this.status,this.currentPage,this.itemsPerPage).subscribe((pagination:any) => {
      // Handle response data
      this.hasNextPage = pagination.lastPage;
      this.defaultAreas = pagination.content;
      this.totalElements = pagination.totoalElement;
      this.pageSize = pagination.pageSize;
      console.log(pagination);
    },(error) => {
      console.error("error while fetching record base on search", error);
    });
  }
  search(): void {

  this.getPaginateAreaListBaseOnSearch();
  }
  // getAreaByStatusPagination(status:string){
  //   this.areaDataService.getPaginateAreaBaseOnStatus(this.currentPage ,this.pageSize,status).subscribe((areaList:Area[])=>{
  //     this.defaultAreas = areaList
  //     console.log(areaList)
  //   },(error)=>{
  //     console.error("fetching area details ", error)
  //   })
  // }
  getAreaByStatusPagination(status: string) {
    this.currentPage = 0;
    if (status === "all") {
      this.status=null
      this.query=null
      // this.getAllLocationList();
      this.getPaginateAreaListBaseOnSearch();
    } else {
      this.status=status
      this.query=null
      this.currentPage=0,
     this.getPaginateAreaListBaseOnSearch();
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
