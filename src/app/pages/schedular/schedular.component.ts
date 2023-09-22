import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Schedule } from 'src/app/Classes/schedule';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';


@Component({
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

    schedule: Schedule = new Schedule;
    defaultSchedules: Schedule[] = [];
    public focus;
    searchText: any;
    
    constructor(
      private scheduleDataService: ScheduleDataService,
      private router: Router,
      public translate: TranslateService
    ) {
      translate.addLangs(['English', 'Marathi']);
      translate.setDefaultLang('English');
    }
  

     //get all location data

  private getAllData(){
    this.scheduleDataService.getAllData().subscribe(
      (data: Schedule[]) => {
        this.defaultSchedules =data;
        console.log(this.defaultSchedules)
      },)
  }


    //active data
    private getMemberList() {
      this.scheduleDataService.getActiveScheduleRecord().subscribe(
        (data: Schedule[]) => {
          this.defaultSchedules = data;
          console.log(this.defaultSchedules);
        },
        (error) => {
          console.error('Error fetching locations:', error);
        }
      );
    }

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
      this.getMemberList();
    }
  
    onOpen() {
      console.log(this.schedule);
      this.router.navigate(['/add-schedular']);
    }
    
    toggleButtons(operation: string, schedule: any) {
      if (operation === 'edit') {
        schedule.isEditing = true;
      }
    }

  
    updateMember(schedularId: number) {
      this.router.navigate(['/update-schedule', schedularId]);
    }

    // show all data and handl using active in active button 
  }
  