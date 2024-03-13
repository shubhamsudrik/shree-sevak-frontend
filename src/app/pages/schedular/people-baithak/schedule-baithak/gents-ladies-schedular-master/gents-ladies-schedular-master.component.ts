import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Baithak } from 'src/app/Classes/baithak';
import { Schedule } from 'src/app/Classes/schedule';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { BaithakDataService } from 'src/app/services/baithak-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gents-ladies-schedular-master',
  templateUrl: './gents-ladies-schedular-master.component.html',
  styleUrls: ['./gents-ladies-schedular-master.component.css']
})
export class GentsLadiesSchedularMasterComponent implements OnInit {


schedule: Schedule = new Schedule;
defaultSchedules: any[] = [];
public focus;
searchText: any;
searchText1: any;
searchText2: any;
baithakList:Baithak[];
baithakDataService: any;


// Pagination
currentPage: number = 0;
itemsPerPage: number = 10;
query: string=null;
hasNextPage: any;
totalRecords: any;



// get pagedSchedules(): any[] {
//   const startIndex = this.currentPage * this.itemsPerPage;
//   const endIndex = startIndex + this.itemsPerPage;
//   return this.defaultSchedules.slice(startIndex, endIndex);
// }

onPageChange(event: PageEvent): void {
  console.log(event)
this.currentPage = event.pageIndex ;
this.getRecordBypagination();
}

 // record count
 get pagedLocations(): any[] {
  const startIndex = this.currentPage * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.defaultSchedules.slice(startIndex, endIndex);
}

constructor(
  private scheduleDataService: ScheduleDataService,
  private router: Router,
  public translate: TranslateService,
  private baithakService: BaithakDataService,
  private spinner: NgxSpinnerService
) {
  translate.addLangs(['English']);
  translate.setDefaultLang('English');
}

search(): void {
  this.currentPage=0
  this.scheduleDataService.getRecordByPagination(this.query,this.currentPage,this.itemsPerPage).subscribe((pagination:any) => {
    // Handle response data
    this.hasNextPage = pagination.lastPage;
    this.defaultSchedules = pagination.content;
    this.totalRecords = pagination.totoalElement;
    // this.itemsPerPage = pagination.pageSize;
    console.log(pagination);
  },(error) => {
    console.error("error while fetching record base on search", error);
  });
}

 //get all schedule data

private getAllData(){
// this.scheduleDataService.getAllData().subscribe(
//   (data: Schedule[]) => {
//     this.defaultSchedules =data;
   
//     console.log(this.defaultSchedules)
//   },)
}

private getBaithakList(){
this.baithakService.getBaithakByStatus("1").subscribe((data:Baithak[])=>{
  this.baithakList=data;
  console.log(this.baithakList)
}),error => console.log(error);
}


// //active member data
// private getMemberList() {
//   this.scheduleDataService.getActiveScheduleRecord().subscribe(
//     (data: Schedule[]) => {
//       this.defaultSchedules = data;
//       console.log(this.defaultSchedules);
//     },
//     (error) => {
//       console.error('Error fetching member:', error);
//     }
//   );
// }

statusSchedule(status: string){
  if (status === "all") {
    this.getAllData();
  }else{

  this.scheduleDataService.getScheduleByStatus(status).subscribe(
    (data: Schedule[]) => {
      this.defaultSchedules = data;
      console.log(data);
    },
    (error) => {
      console.error("fetching baithak detail:", error);
    }
  );
  }
}

switchLang(lang: string) {
  this.translate.use(lang);
}

ngOnInit(): void {
  this.spinner.show();

  // this.getAllData();
 this.getRecordBypagination();
  this.getBaithakList();                                    
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
  }, 5000);

}

getRecordBypagination(){
//   this.scheduleDataService.getRecordByPagination(this.query,this.currentPage,this.itemsPerPage).subscribe((pagination:any) => {
//     this.defaultSchedules=pagination.content
//     this.hasNextPage = pagination.lastPage;
//     this.totalRecords = pagination.totoalElement;
//     this.itemsPerPage = pagination.pageSize;
//   })
}
getAllRecordOnPagination(pageNumber:number,pageSize:number) {
//   this.scheduleDataService.getAllrecordOnPagination(pageNumber,pageSize).subscribe((records:any) => {

//     this.defaultSchedules=records.content
//     console.log(records)
//     this.hasNextPage = records.lastPage;
//     this.totalRecords = records.totoalElement;
//     this.itemsPerPage = records.pageSize;
    
//   })
}
onOpen(value:any) {
  console.log(this.schedule);
  this.router.navigate(['/add-schedular'], {queryParams:{baithakId:value}});
}

toggleButtons(operation: string, schedule: any) {
  if (operation === 'edit') {
    schedule.isEditing = true;
  }
}


updateSchedules(value: any) {
  console.log(value);
  this.router.navigate(['/add-schedular'], {
    queryParams: { baithakId: value,date:value },
   
  });
}

// show all data and handl using active in active button 

}
