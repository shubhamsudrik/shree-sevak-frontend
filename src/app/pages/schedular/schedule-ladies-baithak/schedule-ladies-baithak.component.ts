import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Location } from 'src/app/Classes/location';

import { LocService } from 'src/app/services/loc.service';
import { Router } from '@angular/router';

export class CalendarDay {
  public date: Date;
  public title: string;
  public isPastDate: boolean;
  public isToday: boolean;

  public getDateString() {
    return this.date.toISOString().split("T")[0]
  }

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }

}

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays = [];
    let weekDays = [];

    calendarDaysArray.map((day,index) => {
        weekDays.push(day);
        if (++index % chunkSize  === 0) {
          calendarDays.push(weekDays);
          weekDays = [];
        }
    });
    return calendarDays;
  }
}

@Component({
  selector: 'schedule-ladies-baithak',
  templateUrl: './schedule-ladies-baithak.component.html',
  styleUrls: [ './schedule-ladies-baithak.component.css' ]
})
export class ScheduleLadiesBaithakComponent implements OnInit {
  location: Location = new Location;
  defaultLocations: Location[] = [];

  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string;
  private monthIndex: number = 0;
  public displayYear: number;

  constructor(
    private router: Router,
    private locationDataService: LocService,
    ) {}

  ngOnInit(): void {
    this.getLocationList()
    this.generateCalendarDays(this.monthIndex);
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

   public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

   //get active location data
   private getLocationList(){
    this.locationDataService.getLocationList().subscribe(
      (data: any[]) => {
        this.defaultLocations =data;
        console.log(this.defaultLocations)
      },)
   }
}

