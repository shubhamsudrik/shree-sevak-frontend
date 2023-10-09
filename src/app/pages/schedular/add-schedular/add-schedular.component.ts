import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Location } from 'src/app/Classes/location';
import { Member } from 'src/app/Classes/member';
import { MemberListService } from 'src/app/services/member-list.service';

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

  constructor(date: Date, reader: string = '', location: string = '',writer: string='') {
    super(date);
    this.selectedLocation = location;
    this.selectedReader = reader;
    this.selectedWriter = writer;
  }
}

@Pipe({
  name: 'chunk',
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
  selector: 'add-schedular',
  templateUrl: './add-schedular.component.html',
  styleUrls: ['./add-schedular.component.css'],
})
export class AddSchedularComponent implements OnInit {
  location: Location = new Location;

  defaultLocations: Location[] = [];
  defaultMembers: Member[] = [];
  
  searchText: string = '';
  public calendar: CalendarDay[] = [];
  public meetings: MeetingDay[] = [];
  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public displayMonth: string;
  public displayYear: number;
  private monthIndex: number = 0;
  selectedLocation: any;
  selectedReader: any ;
  selectedWriter: any ;

  constructor(
    private router: Router,
    private locationDataService: LocationDataService,
    private memberListService: MemberListService,
    ) {}

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.getLocationList();
    this.getMemberList();
  
  }

  private generateCalendarDays(monthIndex: number): void {
    // Reset the calendar
    this.meetings = [];

    // Set the date
    let day: Date = new Date(new Date().getFullYear(), new Date().getMonth() + monthIndex, 1);

    // Set the display month and year for UI
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();

    let dateToAdd = day;

    // While adding dates to the calendar, ensure they belong to the selected month and are Sundays.
    while (dateToAdd.getMonth() === day.getMonth()) {
      if (dateToAdd.getDay() === 0) {
        this.meetings.push(new MeetingDay(new Date(dateToAdd)));
      }
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  goBack() {
    this.router.navigate(['/schedular']);
  }

  public updateMeeting(index: number, reader: string, location: string, writer: string) {
    if (index >= 0 && index < this.meetings.length) {
      this.meetings[index].selectedReader = reader;
      this.meetings[index].selectedLocation = location;
      this.meetings[index].selectedWriter = writer;
    }
  }

  //get active location data
  private getLocationList(){
    this.locationDataService.getLocationList().subscribe(
      (data: Location[]) => {
        this.defaultLocations =data;
        console.log(this.defaultLocations)
      },)
    }
    
    onLocationSelect(location: any, meeting: MeetingDay) {
      this.selectedLocation=meeting
      meeting.selectedLocation = location.locationId;
    }

      //get all member data
  private getMemberList(){
    this.memberListService.getAllMemberList().subscribe(
      (data: Member[]) => {
        this.defaultMembers =data;
        console.log(this.defaultMembers)
      },)
  }
  onReaderSelect(reader: any, meeting: MeetingDay) {   
    meeting.selectedReader = reader.memberId;
    console.log("meeting",meeting)
    
  }
  onWriterSelect(writer: any, meeting: MeetingDay) {
    meeting.selectedWriter = writer.memberId;
    console.log("meeting",meeting)  
    console.log(this.selectedLocation)
  }
  
}
