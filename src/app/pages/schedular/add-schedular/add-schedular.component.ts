import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Location } from 'src/app/Classes/location';
import { Member } from 'src/app/Classes/member';
import { MemberListService } from 'src/app/services/member-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocService } from 'src/app/services/loc.service';

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
  schedularForm: FormGroup;
  
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
    private locationDataService: LocService,
    private memberListService: MemberListService,
    private formBuilder: FormBuilder ,
    ) {


    }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.getLocationList();
    this.getMemberList();
  

    this.schedularForm = this.formBuilder.group({
      selectedLocation: [''],
      selectedReader: [''],
      selectedWriter: [''],
    })
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
      (data: any[]) => {
        this.defaultLocations =data;
        console.log(this.defaultLocations)
      },)
    }
    
    onLocationSelect(location: any, meeting: MeetingDay) {
      this.selectedLocation=meeting
      meeting.selectedLocation = location.locationId;
    }

      //get active member data
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
  onSubmit() {
    const formValues = this.schedularForm.value;
    console.log(formValues);
  }
}


// import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
// import { Router } from '@angular/router';
// import { LocationDataService } from 'src/app/services/location-data.service';
// import { Location } from 'src/app/Classes/location';
// import { Member } from 'src/app/Classes/member';
// import { MemberListService } from 'src/app/services/member-list.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

// export class CalendarDay {
//   public date: Date;
//   public title: string;
//   public isPastDate: boolean;
//   public isToday: boolean;

//   public getDateString() {
//     return this.date.toISOString().split("T")[0];
//   }

//   constructor(d: Date) {
//     this.date = d;
//     this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
//     this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
//   }
// }



// export class MeetingDay extends CalendarDay {

//   public selectedLocation: string;
//   public selectedReader: string;
//   public selectedWriter: string;

//   constructor(date: Date, reader: string = '', location: string = '',writer: string='') {
//     super(date);
//     this.selectedLocation = location;
//     this.selectedReader = reader;
//     this.selectedWriter = writer;
//   }
// }

// @Pipe({
//   name: 'chunk',
// })
// export class ChunkPipe implements PipeTransform {
//   transform(calendarDaysArray: any, chunkSize: number): any {
//     let calendarDays = [];
//     let weekDays = [];

//     calendarDaysArray.map((day, index) => {
//       weekDays.push(day);
//       if (++index % chunkSize === 0) {
//         calendarDays.push(weekDays);
//         weekDays = [];
//       }
//     });
//     return calendarDays;
//   }
// }

// @Component({
//   selector: 'add-schedular',
//   templateUrl: './add-schedular.component.html',
//   styleUrls: ['./add-schedular.component.css'],
// })
// export class AddSchedularComponent implements OnInit {
//   location: Location = new Location;

//   defaultLocations: Location[] = [];
//   defaultMembers: Member[] = [];
//   schedularForm: FormGroup;
  
//   searchText: string = '';
//   public calendar: CalendarDay[] = [];
//   public meetings: MeetingDay[] = [];
//   public monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   public displayMonth: string;
//   public displayYear: number;
//   private monthIndex: number = 0;
//   selectedLocation: any;
//   selectedReader: any ;
//   selectedWriter: any ;

//   constructor(
//     private router: Router,
//     private locationDataService: LocationDataService,
//     private memberListService: MemberListService,
//     private formBuilder: FormBuilder ,
//     ) {

//       // Initialize the form controls within the constructor
//     this.schedularForm = this.formBuilder.group({
//       // Define your form controls with default values if needed
//       selectedLocation: [''],
//       selectedReader: [''],
//       selectedWriter: [''],
//     });
//     }

//   ngOnInit(): void {
//     this.generateCalendarDays(this.monthIndex);
//     this.getLocationList();
//     this.getMemberList();
  
//   }

//   private generateCalendarDays(monthIndex: number): void {
//     // Reset the calendar
//     this.meetings = [];

//     // Set the date
//     let day: Date = new Date(new Date().getFullYear(), new Date().getMonth() + monthIndex, 1);

//     // Set the display month and year for UI
//     this.displayMonth = this.monthNames[day.getMonth()];
//     this.displayYear = day.getFullYear();

//     let dateToAdd = day;

//     // While adding dates to the calendar, ensure they belong to the selected month and are Sundays.
//     while (dateToAdd.getMonth() === day.getMonth()) {
//       if (dateToAdd.getDay() === 0) {
//         this.meetings.push(new MeetingDay(new Date(dateToAdd)));
//       }
//       dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
//     }
//   }

//   public increaseMonth() {
//     this.monthIndex++;
//     this.generateCalendarDays(this.monthIndex);
//   }

//   public decreaseMonth() {
//     this.monthIndex--;
//     this.generateCalendarDays(this.monthIndex);
//   }

//   public setCurrentMonth() {
//     this.monthIndex = 0;
//     this.generateCalendarDays(this.monthIndex);
//   }

//   goBack() {
//     this.router.navigate(['/schedular']);
//   }

//   public updateMeeting(index: number, reader: string, location: string, writer: string) {
//     if (index >= 0 && index < this.meetings.length) {
//       this.meetings[index].selectedReader = reader;
//       this.meetings[index].selectedLocation = location;
//       this.meetings[index].selectedWriter = writer;
//     }
//   }

//   //get active location data
//   private getLocationList(){
//     this.locationDataService.getLocationList().subscribe(
//       (data: Location[]) => {
//         this.defaultLocations =data;
//         console.log(this.defaultLocations)
//       },)
//     }
    
//     onLocationSelect(location: any, meeting: MeetingDay) {
//       this.selectedLocation=meeting
//       meeting.selectedLocation = location.locationId;
//     }

//       //get all member data
//   private getMemberList(){
//     this.memberListService.getAllMemberList().subscribe(
//       (data: Member[]) => {
//         this.defaultMembers =data;
//         console.log(this.defaultMembers)
//       },)
//   }
//   onReaderSelect(reader: any, meeting: MeetingDay) {   
//     meeting.selectedReader = reader.memberId;
//     console.log("meeting",meeting)
    
//   }
//   onWriterSelect(writer: any, meeting: MeetingDay) {
//     meeting.selectedWriter = writer.memberId;
//     console.log("meeting",meeting)  
//     console.log(this.selectedLocation)
//   }
  
//    onSubmit() {
//     // You can access form values like this:
//     const formValues = this.schedularForm.value;

//     // Use formValues to submit your data or perform other actions
//     // For example, send data to a service to save it.
//     console.log(formValues);
//   }
// }
// <div class="container-fluid mt--7 pb-8 pt-50 pt-md-8">
//   <div class="row">
//     <div class="col">
//       <div class="card shadow">
//         <div class="card-header border-0">
//           <ul class="nav nav-pills flex-column flex-md-row justify-content-center">
//             <li class="nav-item">
//               <span class="d-none d-md-block form-group">
//                 <h2>{{ 'Schedule child baithak' | translate }}</h2>
//               </span>
//             </li>
//           </ul>

//           <div>
//             <div>
//               {{ displayMonth }} {{ displayYear }}
//             </div>
//             <div>
//               <button type="button" class="btn btn-info" (click)="setCurrentMonth()" value="today">Current month</button>
//               <button type="button" class="btn btn-info" (click)="decreaseMonth()" value="-">
//                 <i class="fas fa-chevron-left"></i>
//               </button>
//               <button type="button" class="btn btn-info" (click)="increaseMonth()">
//                 <i class="fas fa-chevron-right"></i>
//               </button>
//               <button type="button" class="btn btn-info" (click)="goBack()" value="back">Go on schedule</button>
//             </div>
//           </div>
//           <br />
//           <div class="table-responsive">
//             <form [formGroup]="schedularForm" (ngSubmit)="onSubmit()">
//               <table class="calendar-table" *ngIf="calendar">
//                 <thead>
//                   <tr>
//                     <th>Sunday</th>
//                     <th>Sunday</th>
//                     <th>Sunday</th>
//                     <th>Sunday</th>
//                     <th>Sunday</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <!-- Display meeting data horizontally -->
//                     <td
//                       class="calendar-day"
//                       [ngClass]="{ 'past-date': c.isPastDate, 'today': c.isToday }"
//                       *ngFor="let c of meetings; let j = index"
//                     >
//                       <div class="calendar-day-header" [ngClass]="{ 'blue-date': c.isToday }">
//                         <strong>{{ c.date.getDate() }}-</strong> <strong>{{ monthNames[c.date.getMonth()] }}</strong>
//                       </div>

//                       <!-- Get location data dropdown -->
//                       <div class="dropdown">
//                         <button class="btn btn-secondary dropdown-toggle btn-dropdown" type="button" data-toggle="dropdown">
//                           {{ schedularForm.get('selectedLocation').value || 'Select Location' }}
//                         </button>
//                         <div class="dropdown-menu">
//                           <a
//                             *ngFor="let location of defaultLocations"
//                             class="dropdown-item"
//                             (click)="schedularForm.get('selectedLocation').setValue(location.locationId)"
//                           >
//                             {{ location.locationName }}
//                           </a>
//                         </div>
//                       </div>

//                       <!-- Get Reader data dropdown -->
//                       <div class="dropdown">
//                         <button class="btn btn-secondary dropdown-toggle btn-dropdown" type="button" data-toggle="dropdown">
//                           {{ schedularForm.get('selectedReader').value || 'Select Reader' }}
//                         </button>
//                         <div class="dropdown-menu">
//                           <a
//                             *ngFor="let reader of defaultMembers"
//                             class="dropdown-item"
//                             (click)="schedularForm.get('selectedReader').setValue(reader.memberId)"
//                           >
//                             {{ reader.firstName }}
//                           </a>
//                         </div>
//                       </div>
//                       <!-- Get Writer data dropdown -->
//                       <div class="dropdown">
//                         <button class="btn btn-secondary dropdown-toggle btn-dropdown" type="button" data-toggle="dropdown">
//                           {{ schedularForm.get('selectedWriter').value || 'Select Writer' }}
//                         </button>
//                         <div class="dropdown-menu">
//                           <a
//                             *ngFor="let writer of defaultMembers"
//                             class="dropdown-item"
//                             (click)="schedularForm.get('selectedWriter').setValue(writer.memberId)"
//                           >
//                             {{ writer.firstName }}
//                           </a>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>

//               <!-- Add a submit button to submit the form -->
//               <button type="submit" class="btn btn-primary">Submit</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
