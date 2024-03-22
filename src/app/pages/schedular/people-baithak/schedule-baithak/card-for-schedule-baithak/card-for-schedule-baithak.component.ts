import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeopleBaithak } from 'src/app/Classes/people-baithak';
import { PeopleSchedule } from 'src/app/Classes/people-schedule';
import { MemberListService } from 'src/app/services/member-list.service';
import { SchedulePeopleBaithakService } from 'src/app/services/schedule-people-baithak.service';

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

  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() dayBaithakList:any[] = [];
  @Input() day:any
  @Input() day1:any

  baithakFormCard:FormGroup;
  defaultMembers: any;
  totalElements: any;
  memberList: any[]=[];
  calendar: CalendarDay[] = [];
  weekStartDate: Date;
  scheduleform: FormGroup;
  peopleBaithak: PeopleSchedule = new PeopleSchedule();

  selectedBaithak: any = {}; // Store selected baithak ID and date
  selectedMemberId: any;
  selectedBaithakId: number;
  selectedDate: string;


  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private memberListService: MemberListService,
    private schedulePeopleBaithakService: SchedulePeopleBaithakService,

  ) {
  }

  ngOnInit(): void {
    this.weekStartDate = new Date(); // Initialize with current date
    this.populateCalendar();
    this.initializingForm();
    this.getAllActiveMemberList();
    
  }
  
  initializingForm() {
    this.scheduleform = this.formBuilder.group({
      member: ["", Validators.required],
      date : [null],
      baithakId:[null],
  });
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
  
    // this.valueUpdate.emit(baithak);

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

      onClickMember(baithakId: number, date: string) {
        let memberList = [];
          for (let i = 0; i < this.defaultMembers.length; i++) {
            // console.log(this.defaultMembers[i]);
            // console.log(memberList.push(...this.defaultMembers[i]));
            memberList = this.defaultMembers;
          }
          this.memberList = memberList;
          // console.log(this.memberList);


        const memberId = this.scheduleform.get('member').value;
        if (memberId && memberId !== 'null') {

          this.selectedMemberId = memberId;
          this.selectedBaithakId = baithakId;
          this.selectedDate = date;

          // Set the selected member ID
          this.peopleBaithak.member = memberId;
      
          // Set the baithak ID and date
          this.peopleBaithak.baithak = baithakId;
          this.peopleBaithak.date = date;
      
          console.log('Selected member ID:', memberId);
          console.log('Selected baithak ID:', baithakId);
          console.log('Selected date:', date);
        } else {
          console.log('No member selected.');
        }

        this.selectedBaithakId = baithakId;
        this.selectedDate = date;

        console.log('Selected baithak ID:', baithakId);
        console.log('Selected date:', date);

  
      }
      onMemebrChange(peopleSchedule: PeopleSchedule){
         console.log('in member change method',peopleSchedule)
          this.valueChange.emit(peopleSchedule)
      }
   
}