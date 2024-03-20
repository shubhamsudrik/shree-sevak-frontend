import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SchedulePeopleBaithakService } from 'src/app/services/schedule-people-baithak.service';

@Component({
  selector: 'app-people-schedular-master',
  templateUrl: './people-schedular-master.component.html',
  styleUrls: ['./people-schedular-master.component.css']
})
export class PeopleSchedularMasterComponent implements OnInit {

  public focus;
  searchText: any;
  searchText1: any;
  searchText2: any;    
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalElements: any;
  totalPages: any;
status: any;
hasNextPage: any;
pageSize: any;
query: any;
  scheduleList: any;


  get pagedMembers(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.scheduleList;
  }

  onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex ;
  console.log("this.currentPage",this.currentPage);
  console.log("event.pageIndex",event.pageIndex);
  }

  // record count
get pagedLocations(): any[] {
  const startIndex = this.currentPage * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.scheduleList.slice(startIndex, endIndex);
}

  constructor(
    private schedulePeopleBaithakService: SchedulePeopleBaithakService,
    private router: Router,
    public translate: TranslateService
  ) {  }



//get all schedular data
private getAllpeopleScheduleList() {
  this.schedulePeopleBaithakService.getAllpeopleScheduleList().subscribe((data: any[]) => {
    this.scheduleList = data;
    console.log(this.scheduleList);
  });
}

ngOnInit(): void {
  this.getAllpeopleScheduleList();
}

}
