import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AgendaService, DayService, MonthAgendaService, MonthService, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { Baithak } from 'src/app/Classes/baithak';
import { Schedule } from 'src/app/Classes/schedule';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { BaithakDataService } from 'src/app/services/baithak-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
  selector: 'app-schedular',
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

    schedule: Schedule = new Schedule;
    defaultSchedules: Schedule[] = [];
    public focus;
    searchText: any;
    searchText1: any;
    searchText2: any;
    baithakList:Baithak[];
  baithakDataService: any;


    
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

     //get all schedule data

  private getAllData(){
    this.scheduleDataService.getAllData().subscribe(
      (data: Schedule[]) => {
        this.defaultSchedules =data;
       
        console.log(this.defaultSchedules)
      },)
  }

  private getBaithakList(){
    this.baithakService.getBaithakByStatus("1").subscribe((data:Baithak[])=>{
      this.baithakList=data;
      console.log(this.baithakList)
    }),error => console.log(error);
  }


    //active member data
    private getMemberList() {
      this.scheduleDataService.getActiveScheduleRecord().subscribe(
        (data: Schedule[]) => {
          this.defaultSchedules = data;
          console.log(this.defaultSchedules);
        },
        (error) => {
          console.error('Error fetching member:', error);
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
      this.spinner.show();

      this.getAllData();
      this.getBaithakList();                                    
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);

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

  
    updateSchedules(value: number) {
      console.log(value);
      this.router.navigate(["/update-schedule"], {
        queryParams: { baithakId: value },
      });
    }

    // show all data and handl using active in active button 
    
  }
  