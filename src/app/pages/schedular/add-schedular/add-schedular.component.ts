import {
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from "@angular/core";



import { Location } from "src/app/Classes/location";

import { Member } from "src/app/Classes/member";

import { MemberListService } from "src/app/services/member-list.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ScheduleDataService } from "src/app/services/schedule-data.service";

import { LocService } from "src/app/services/loc.service";
import { ScheduleDto } from "src/app/Classes/schedule-dto";
import { DynamicformComponent, Memebr1 } from "./dynamicform/dynamicform.component";
import { ToastrService } from "ngx-toastr";

import { firstValueFrom } from "rxjs";
import { Schedule } from "src/app/Classes/schedule";
import { error } from "console";
import { Router, ActivatedRoute } from "@angular/router";

export class CalendarDay {
  public date: Date;

  public title: string;

  public isPastDate: boolean;

  public isToday: boolean;

  public getDateString() {
    return this.date.toISOString().split("T")[0];
  }

  constructor(d: Date) {
    this.date = d;

    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
}

export class MeetingDay extends CalendarDay {
  public selectedLocation: string;

  public selectedReader: string;

  public selectedWriter: string;

  constructor(
    date: Date,

    reader: string = "",

    location: string = "",

    writer: string = ""
  ) {
    super(date);

    this.selectedLocation = location;

    this.selectedReader = reader;

    this.selectedWriter = writer;
  }
}

@Pipe({
  name: "chunk",
})
export class ChunkPipe implements PipeTransform {
  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays = [];

    let weekDays = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);

      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);

        weekDays = [];
      }
    });

    return calendarDays;
  }
}

@Component({
  selector: "add-schedular",

  templateUrl: "./add-schedular.component.html",

  styleUrls: ["./add-schedular.component.css"],
  providers: [],
})
export class AddSchedularComponent implements OnInit {
  location: Location = new Location();
  @ViewChild(DynamicformComponent) dynamicformcomponent: DynamicformComponent;
  schedularForm: FormGroup;

  baithakId: string;

  scheduleDto: ScheduleDto = new ScheduleDto();

  scheduleMemeberArray = new Set<number>();
  scheduleArray: ScheduleDto[] = [];

  privousSchduleDto: ScheduleDto;

  defaultLocations: Location[] = [];

  defaultMembers: any[] = [];

  searchText: string = "";

  public calendar: CalendarDay[] = [];

  public meetings: MeetingDay[] = [];

  public monthNames = [
    "January",

    "February",

    "March",

    "April",

    "May",

    "June",

    "July",

    "August",

    "September",

    "October",

    "November",

    "December",
  ];

  public displayMonth: string;

  public displayYear: number;

  private monthIndex: number = 0;

  selectedLocation: any;

  selectedReader: any;

  selectedWriter: any;

  displayDayCount: any;
  defaultVachanMembers: Member[];
  defaultHajeriMembers: Member[];
  hasSave: boolean ;
  collectionOfSchedule: Schedule[];
  defaultMembers1: Memebr1[]=[];

  constructor(
    private router: Router,

    private locationDataService: LocService,

    private memberListService: MemberListService,

    private formBuilder: FormBuilder,

    private scheduleService: ScheduleDataService,

    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.baithakId = this.route.snapshot.queryParamMap.get("baithakId");

    this.initializingForm();

    this.generateCalendarDays(this.monthIndex);

    this.getLocationList();

    this.getMemberList();

    this.getNumberOfDaysInMonth();

    // this.creatingScheduleObjects();

    this.initializingForm();
    // To fetch schedules for the current month

    this.toHideSaveandUpdateButton2(this.displayMonth, this.baithakId);
  }

  private generateCalendarDays(monthIndex: number): void {
    // Reset the calendar

    this.meetings = [];

    // Set the date

    let day: Date = new Date(
      new Date().getFullYear(),

      new Date().getMonth() + monthIndex
    );

    console.log(day);

    // console.log(day.getDay);

    // Set the display month and year for UI

    // console.log(day.getMonth());

    this.displayMonth = this.monthNames[day.getMonth()];

    this.displayYear = day.getFullYear();

    let dateToAdd = day;

    // console.log(dateToAdd);

    // While adding dates to the calendar, ensure they belong to the selected month and are Sundays.

    while (dateToAdd.getMonth() === day.getMonth()) {
      console.log(dateToAdd.getMonth(), day.getMonth());

      //.getDay() is moday,sunday,saturday like week day

      console.log(dateToAdd.getDay());

      if (dateToAdd.getDay() === 0) {
        // console.log(dateToAdd.getDay(), "inside if");

        // console.log(dateToAdd);

        this.meetings.push(new MeetingDay(new Date(dateToAdd)));
        console.log(this.meetings)
      }

      // console.log(dateToAdd.getDate());

      // console.log(dateToAdd.getDate() + 1);

      //getDate() returns the current day means 11,12,28

      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));

      console.log("inside while", dateToAdd);
    }
  }

  public increaseMonth() {
    this.monthIndex++;

    this.generateCalendarDays(this.monthIndex);

    this.toHideSaveandUpdateButton(true);
    this.getNumberOfDaysInMonth();
    // this.getMemberList();
    // this.creatingScheduleObjects();
  }

  public decreaseMonth() {
    this.monthIndex--;

    this.generateCalendarDays(this.monthIndex);

    this.toHideSaveandUpdateButton(false);
    this.getNumberOfDaysInMonth();
    
    // this.creatingScheduleObjects();
    // this.getMemberList();
  }

  public setCurrentMonth() {
    this.monthIndex = 0;

    this.generateCalendarDays(this.monthIndex);

    this.toHideSaveandUpdateButton2(this.displayMonth, this.baithakId);
    this.getNumberOfDaysInMonth();
    // To fetch schedules for the current month
   
  

    // this.creatingScheduleObjects();
  }

  goBack() {
    this.router.navigate(["/schedular"]);
  }

  public updateMeeting(
    index: number,

    reader: string,

    location: string,

    writer: string
  ) {
    if (index >= 0 && index < this.meetings.length) {
      this.meetings[index].selectedReader = reader;

      this.meetings[index].selectedLocation = location;

      this.meetings[index].selectedWriter = writer;
    }
  }

  //get active location data

  private getLocationList() {
    this.locationDataService.getLocationList().subscribe((data: Location[]) => {
      this.defaultLocations = data;

      console.log(this.defaultLocations);
    });
  }

  onLocationSelect(location: any, meeting: MeetingDay) {
    this.selectedLocation = meeting;

    meeting.selectedLocation = location.locationId;
  }

  //get all member data

  private getMemberList() {
    this.memberListService.getMemberList().subscribe((data: Member[]) => {
      this.defaultMembers = data;
      // let defaultmemebrsList:Memebr1[]=[];
      this.defaultMembers.map((member) => {
       const modifyValue=`${member.firstName}-${member.middleName}-${member.lastName},`
       this.defaultMembers1.push({id: member.memberId,value:modifyValue}) 
     });
     
     console.log("hajerimember list",this.defaultMembers1)
      // this.scheduleService.setMembers(this.defaultMembers);
      // this.hajeriMembers = data.filter((member: Member) => {
      //   if (member.hajeriNo === "1") {
      //     return member;
      //   }
      // });

      // this.vachanMembers = data.filter((member: Member) => {
      //   if (member.hajeriNo === "2") {
      //     return member;
      //   }
      // });

      console.log(this.defaultMembers);
    });
  }

  onReaderSelect(reader: any, meeting: MeetingDay) {
    meeting.selectedReader = reader.memberId;

    console.log("meeting", meeting);
  }

  onWriterSelect(writer: any, meeting: MeetingDay) {
    meeting.selectedWriter = writer.memberId;

    console.log("meeting", meeting);

    console.log(this.selectedLocation);
  }

  initializingForm() {
    this.schedularForm = this.formBuilder.group({
      locationId: ["", Validators.required],

      baithakId: ["", Validators.required],

      hajeriGhenara: ["", Validators.required],

      vachanGhenara: ["", Validators.required],

      status: ["", Validators.required],

      date: ["", Validators.required],

      // scheduleForms: this.formBuilder.array([

      //   this.formBuilder.group({

      //     locationId: ["", Validators.required],

      //     baithakId: ["", Validators.required],

      //     hajeriGhenara: ["", Validators.required],

      //     vachanGhenara: ["", Validators.required],

      //     status: ["", Validators.required],

      //     date: ["", Validators.required],

      //   }),

      // ]),
    });
  }

  getNumberOfDaysInMonth() {
    // let number=parseInt(10, 10);

    let daysCount: number;

    for (let i = 0; i < this.monthNames.length; i++) {
      if (this.displayMonth == this.monthNames[i]) {
        daysCount = i;

        break;
      }
    }

    // Create a Date object for the first day of the next month

    const date = new Date(this.displayYear, daysCount + 1, 1);

    // Subtract one day from the first day of the next month to get the last day of the current month

    date.setDate(date.getDate() - 1);

    console.log(date.getDate());

    // The date now holds the last day of the specified month

    return date.getDate();
  }

  // creatingScheduleObjects(): any {

  //   console.log(this.getNumberOfDaysInMonth());

  //   let daysCount = this.getNumberOfDaysInMonth();

  //   for (let i = 0; i < daysCount; i++) {

  //     const scheduleDto = new ScheduleDto();

  //     // console.log(scheduleDto);

  //     this.scheduleArray.push(scheduleDto);

  //     // console.log(this.scheduleArray);

  //   }

  // }

  getFormControl() {
    return this.schedularForm.controls;
  }

  // onSubmit() {

  //   console.log(this.schedularForm.value);

  //   this.schedularForm.reset();

  // }

  /**

   *

   * @param scheduleArray

   * @param newSchedule

   */

  updateOrPushSchedule(scheduleArray, newSchedule) {
    // Find the index in the scheduleArray where locationId, baithakId, and date match

    const index = scheduleArray.findIndex(
      (schedule) =>
        schedule.locationId === newSchedule.locationId &&
        schedule.baithakId === newSchedule.baithakId &&
        schedule.date === newSchedule.date
    );

    if (index !== -1) {
      // If the schedule exists, update vachanGhenara and hajeriGhenara

      scheduleArray[index].vachanGhenara = +newSchedule.vachanGhenara;

      scheduleArray[index].hajeriGhenara = +newSchedule.hajeriGhenara;
    } else {
      // If the schedule doesn't exist, push the newSchedule into the array

      scheduleArray.push(newSchedule);
    }
  }

  /**

   *

   * @param schedule

   * @method updateOrPushSchedule()

   */

  saveChanges(scheduleDto: ScheduleDto) {
    console.log(scheduleDto);
    this.updateOrPushSchedule(this.scheduleArray, scheduleDto);
   
    
  }

  modifyScheduleArray(): any {
    const date = this.dynamicformcomponent.currentDate();
    console.log(date);
    let regex = /(\w{3})\s\d{1,2},\s(\d{4})/;
    const match = date.match(regex);
    const desiredMonth = match[1];
    const desiredYear = match[2];
    let modifyScheduleArray: ScheduleDto[] = [];
    console.log(this.scheduleArray);

    modifyScheduleArray = this.scheduleArray
      .map((schedule) => {
        const scheduleMonthYear = schedule.date.match(regex);
        if (
          desiredMonth === scheduleMonthYear[1] &&
          desiredYear === scheduleMonthYear[2] &&
          (!isNaN(+schedule.vachanGhenara) || !isNaN(+schedule.hajeriGhenara))
        ) {
          return schedule;
        } else {
          return null;
        }
      })
      .filter((schedule) => {
        return schedule !== null;
      });

    console.log(modifyScheduleArray);

    if (modifyScheduleArray.length === 0) {
      this.toast.warning("please filled record");
      this.hasSave=true
      
    } else {
       // Handle the case where the record is not found
              // this.toast.success("Record not found. Creating a new record.");
              this.scheduleService
                .createScheduleRecord(modifyScheduleArray)
                .subscribe(
                  (data) => {
                    this.toast.success(
                      "This month Record created successfully"
                    );
                    // this.router.navigate(["/schedular"]);
                    // console.log(data);
                    this.generateSchedule();
                  },
                  (createError) => console.log(createError)
                );
      // this.scheduleService
      //   .getscheduleByDateAndLocationBaithak(
      //     modifyScheduleArray[0].date,
      //     modifyScheduleArray[0].locationId,
      //     modifyScheduleArray[0].baithakId
      //   )
      //   .subscribe(
      //     (data) => {
      //       if (data) {
      //         this.toast.warning(
      //           "This month Record All ready present go to Update"
      //         );
      //       }
      //     },
      //     (error) => {
      //       if (error.status === 404) {
      //         // Handle the case where the record is not found
      //         this.toast.success("Record not found. Creating a new record.");
      //         this.scheduleService
      //           .createScheduleRecord(modifyScheduleArray)
      //           .subscribe(
      //             (data) => {
      //               this.toast.success(
      //                 "This month Record created successfully"
      //               );
      //               this.router.navigate(["/schedular"]);
      //               console.log(data);
      //             },
      //             (createError) => console.log(createError)
      //           );
      //       } else {
      //         // Handle other types of errors
      //         console.log(error);
      //         this.toast.error(
      //           "An error occurred while processing the request."
      //         );
      //       }
      //     }
      //   );
    }
  }

  async onSubmit() {
    try {
      await this.modifyScheduleArray();
      
    } catch (error) {
      // Handle errors if needed
      console.error('An error occurred:', error);
    }
  }

  updateSchedule() {
    console.log(this.scheduleArray);

    this.scheduleService

      .updateSchedule(this.scheduleArray)
      .subscribe((data) => {
        this.toast.success("Record Updated succesfully");
        // this.schedularForm.reset();
        console.log(data);
      });
  }

  /**
   *
   * @param displayMonth
   * @param displayYear
   * @param baithakId
   */

  toHideSaveandUpdateButton2(displayMonth: string, baithakId) {
    const displayYear1 = new Date().getFullYear().toString();
    const month = displayMonth.substring(0, 3);

    console.log(month, displayYear1, baithakId);
    this.scheduleService
      .getScheduleByMonthAndYearAndBaithak(month, displayYear1, +baithakId)
      .subscribe((data: Schedule[]) => {
        if (data.length === 0) {
          this.hasSave = true;
        } else {
          this.hasSave = false;
        }
      },(err) => {
        this.hasSave = true;
      });
  }
  toHideSaveandUpdateButton(
    increment: boolean = true,
    setCurrentMonth: boolean = false
  ) {
    const currentDate = setCurrentMonth
      ? this.dynamicformcomponent.currentDate()
      : this.dynamicformcomponent.currentDate();
    const currentMonthYearRegex = /(\w{3})\s(\d{1,2}),\s(\d{4})/;
    const match = currentDate.match(currentMonthYearRegex);

    if (!match) {
      // Handle invalid date format
      return;
    }

    const currentMonth = match[1];
    const currentDay = parseInt(match[2], 10);
    const currentYear = parseInt(match[3], 10);

    let nextMonth, nextYear;

    if (setCurrentMonth) {
      // If fetching for the current month, use the current date without incrementing or decrementing
      nextMonth = currentMonth;
      nextYear = currentYear;
    } else {
      // Calculate the next or previous month and year
      if (increment) {
        nextMonth =
          currentMonth === "Dec" ? "Jan" : this.getNextMonth(currentMonth);
        nextYear = currentMonth === "Dec" ? currentYear + 1 : currentYear;
      } else {
        nextMonth =
          currentMonth === "Jan" ? "Dec" : this.getPreviousMonth(currentMonth);
        nextYear = currentMonth === "Jan" ? currentYear - 1 : currentYear;
      }
    }

    // Fetch schedules for the next or previous month, or the current month
    this.scheduleService
      .getScheduleByMonthAndYearAndBaithak(
        nextMonth,
        nextYear.toString(),
        +this.baithakId
      )
      .subscribe((data: Schedule[]) => {
        if (data.length === 0) {
          this.hasSave = true;
        } else {
          this.hasSave = false;
        }
      },
      (error) => {
        console.error(error);
        this.hasSave = true; // Handle error, show "Save and Continue" as a fallback
      }
      );
  }

  getNextMonth(currentMonth: string): string {
    const monthNames = [ "Jan",  "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov",  "Dec",
    ];
    const currentMonthIndex = monthNames.indexOf(currentMonth);
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    return monthNames[nextMonthIndex];
  }

  // Method to get the previous month
  getPreviousMonth(currentMonth: string): string {
    const monthIndex = [ "Jan","Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ].indexOf(currentMonth);
    const previousMonthIndex = (monthIndex - 1 + 12) % 12;
    return [  "Jan",  "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug",  "Sep",  "Oct",  "Nov",  "Dec",
    ][previousMonthIndex];
  }

  generateSchedule(){
  

    const date=this.dynamicformcomponent.currentDate();
      let regex = /(\w{3})\s\d{1,2},\s(\d{4})/;
    const match = date.match(regex);
    const desiredMonth=match[1]
    const desiredYear=match[2]
  
    this.scheduleService.getScheduleByMonthAndYearAndBaithak(desiredMonth,desiredYear,+this.baithakId).subscribe((data:Schedule[])=>{
      this.collectionOfSchedule=data;
      console.log(this.collectionOfSchedule)
      this.router.navigate(["/report"],{queryParams:{schedules:JSON.stringify(this.collectionOfSchedule)}})
      
    },error => console.log(error));
  
  
  
   
    

  }
  // updateSchedule(value: any) {
  //   this.router.navigate(["/update-schedule"], {
  //     queryParams: { baithakId: value },
  //   });
  // }
}
