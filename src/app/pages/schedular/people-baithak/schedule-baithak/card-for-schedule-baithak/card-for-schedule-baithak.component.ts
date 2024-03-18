
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MemberListService } from 'src/app/services/member-list.service';

export class CalendarDay {
  public date: Date;
  public dayName: string;

  constructor(d: Date, dayName: string) {
    this.date = d;
    this.dayName =dayName
  }
}

@Component({
  selector: 'app-card-for-schedule-baithak',
  templateUrl: './card-for-schedule-baithak.component.html',
  styleUrls: ['./card-for-schedule-baithak.component.css']
})
export class CardForScheduleBaithakComponent implements OnInit {

  @Output() valueUpdate: EventEmitter<any> = new EventEmitter();
  @Input() dayBaithakList:any[] = [];
  @Input() day:any

  baithakFormCard:FormGroup;
  defaultMembers: any;
  totalElements: any;
  memberList: any[]=[];
  calendar: CalendarDay[] = [];
  weekStartDate: Date;

  constructor( 
    private memberListService: MemberListService,
  ) {
  }

  ngOnInit(): void {
    this.weekStartDate = new Date(); // Initialize with current date
    this.populateCalendar();
    this.getAllActiveMemberList();
  }

  populateCalendar() {
    this.calendar = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(this.weekStartDate);
      date.setDate(date.getDate() + i);
      const dayName = dayNames[date.getDay()];
      this.calendar.push(new CalendarDay(date, dayName));
    }
    console.log(this.calendar)
  }
  onNextWeek() {
    this.weekStartDate.setDate(this.weekStartDate.getDate() + 7);
    this.populateCalendar();
  }
  
  extractDatesFromCalendar(): Date[] {
    // Extract dates from calendar array
    return this.calendar.map(day => day.date);
  }

  onCardClick(baithak:any):void {
    console.log('onCardClick', baithak);
    this.valueUpdate.emit(baithak);

  }

       //get all active member data
       private getAllActiveMemberList(){
        this.memberListService.getMemberList().subscribe(
          (data: any) => {
            console.log(data);
            console.log(data.content);
            console.log(data.length)
            // for (let i = 0; i < data.length; i++){
            this.defaultMembers=data;
            this.totalElements = data.totoalElement;
            // }
            console.log(this.defaultMembers)
            console.log("data.totalElements", this.totalElements)
          },)
      }

      onClickMember() {

        if (this.memberList.length == 0 || this.memberList == null) {
          let memberList = [];
          for (let i = 0; i < this.defaultMembers.length; i++) {
            console.log(this.defaultMembers[i]);
            // console.log(memberList.push(...this.defaultMembers[i]));
            memberList = this.defaultMembers;
          }
          this.memberList = memberList;
          console.log(this.memberList);
    
        }
    
      }
}
