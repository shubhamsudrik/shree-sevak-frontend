import {
  Component,
  OnChanges,
  OnInit,
  Pipe,
  PipeTransform,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";

import { Member } from "src/app/Classes/member";

import { LocationDataService } from "src/app/services/location-data.service";

import { MemberListService } from "src/app/services/member-list.service";

import { ScheduleDataService } from "src/app/services/schedule-data.service";

import { Location } from "src/app/Classes/location";

import { Schedule } from "src/app/Classes/schedule";

import { LocService } from "src/app/services/loc.service";

import { UpdateDynamicFormComponent } from "./update-dynamic-form/update-dynamic-form.component";
import { ScheduleDto } from "src/app/Classes/schedule-dto";

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
  selector: "app-update-schedule",

  templateUrl: "./update-schedule.component.html",

  styleUrls: ["./update-schedule.component.css"],
})
export class UpdateScheduleComponent implements OnInit {
  location: Location = new Location();

  schedularFormUpdate: FormGroup;

  baithakId: string;

  scheduleDto: ScheduleDto = new ScheduleDto();

  scheduleArray: ScheduleDto[] = [];

  privousSchduleDto: ScheduleDto;

  saveSchduleArray: any[] = [];

  defaultLocations: Location[] = [];

  defaultMembers: Member[] = [];

  hajeriMembers: Member[];

  vachanMembers: Member[];

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

  constructor(
    private router: Router,

    private locationDataService: LocService,

    private memberListService: MemberListService,

    private formBuilder: FormBuilder,

    private scheduleService: ScheduleDataService,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.baithakId = this.route.snapshot.queryParamMap.get("baithakId");

    this.initializingForm();

    this.getLocationList();

    this.getMemberList();

    this.getSaveScheduleList();

    this.generateCalendarDays(this.monthIndex);

    this.getNumberOfDaysInMonth();

    // this.creatingScheduleObjects();

    this.initializingForm();
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

    console.log(day.getDay);

    // Set the display month and year for UI

    console.log(day.getMonth());

    this.displayMonth = this.monthNames[day.getMonth()];

    this.displayYear = day.getFullYear();

    let dateToAdd = day;

    console.log(dateToAdd);

    // While adding dates to the calendar, ensure they belong to the selected month and are Sundays.

    while (dateToAdd.getMonth() === day.getMonth()) {
      console.log(dateToAdd.getMonth(), day.getMonth());

      //.getDay() is moday,sunday,saturday like week day

      console.log(dateToAdd.getDay());

      if (dateToAdd.getDay() === 0) {
        console.log(dateToAdd.getDay(), "inside if");

        console.log(dateToAdd);

        this.meetings.push(new MeetingDay(new Date(dateToAdd)));
      }

      console.log(dateToAdd.getDate());

      console.log(dateToAdd.getDate() + 1);

      //getDate() returns the current day means 11,12,28

      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));

      console.log("inside while", dateToAdd);
    }
  }

  public increaseMonth() {
    this.monthIndex++;

    this.generateCalendarDays(this.monthIndex);

    this.getNumberOfDaysInMonth();

    // this.creatingScheduleObjects();
  }

  public decreaseMonth() {
    this.monthIndex--;

    this.generateCalendarDays(this.monthIndex);

    this.getNumberOfDaysInMonth();

    // this.creatingScheduleObjects();
  }

  public setCurrentMonth() {
    this.monthIndex = 0;

    this.generateCalendarDays(this.monthIndex);

    this.getNumberOfDaysInMonth();

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

      this.hajeriMembers = data.filter((member: Member) => {
        if (member.hajeriNo === "1") {
          return member;
        }
      });

      this.vachanMembers = data.filter((member: Member) => {
        if (member.hajeriNo === "2") {
          return member;
        }
      });

      console.log(this.hajeriMembers);

      console.log(this.vachanMembers);

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
    this.schedularFormUpdate = this.formBuilder.group({
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
    return this.schedularFormUpdate.controls;
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

  saveChanges(schedule: ScheduleDto) {
    this.updateOrPushSchedule(this.scheduleArray, schedule);

    // this.bindingTheRecord(this.saveSchduleArray,schedule)

    console.log(this.scheduleArray);
  }

  // bindingTheRecord(saveArray,schedule){

  //   saveArray.forEach(record =>{

  //     if(record.date === schedule.date && record.locationId===schedule.locationId){

  //     console.log(record)

  //       this.scheduleDto=record

  //     }

  //   })

  // }

  updateSchedule() {
    console.log(this.scheduleArray);

    this.scheduleService

      .updateSchedule(this.scheduleArray) .subscribe((data) => {
        console.log(data);
      });
  }

  GoBack(value: number) {
    this.router.navigate(["/add-schedular"] ,{queryParams: { baithakId: value }},);
  }

  getSaveScheduleList() {
    this.scheduleService.getAllData().subscribe((data) => {
      this.saveSchduleArray = data;
      console.log(this.saveSchduleArray);
    });
  }
}
