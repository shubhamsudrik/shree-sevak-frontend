import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PeopleBaithak } from 'src/app/Classes/people-baithak';
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

  @Output() valueUpdate: EventEmitter<any> = new EventEmitter();
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
  peopleBaithak: PeopleBaithak = new PeopleBaithak();

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

  onSubmit(){
    // if(this.scheduleform.valid){
    //   this.scheduleform.patchValue({
    //     baithakId: this.selectedBaithak.baithakId,
    //     date: this.selectedBaithak.date,
    //   });
    //   console.log(this.scheduleform.value);
      
    //   // Clear selectedBaithak
    //   this.selectedBaithak = {};

    //   // Reset form
    //   this.scheduleform.reset();
    
    if (this.selectedMemberId && this.selectedBaithakId && this.selectedDate) {
      this.peopleBaithak.date = this.selectedDate;
      this.peopleBaithak.member = this.selectedMemberId;
      this.peopleBaithak.baithak = this.selectedBaithakId;
    
      this.schedulePeopleBaithakService.createPeolpeSchedule(this.peopleBaithak).subscribe(
        (data) => {
          console.log(data);
          this.toast.success("New Baithak Created Successfully ");
        },
        (error) => {
          console.log(error);
          this.toast.error("Baithak Already Scheduled For Same Time.");
        }
      );
    } else {
      console.log('Incomplete data. Cannot submit.');
    }
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

      onClickMember(baithakId: number, date: string) {
        let memberList = [];
          for (let i = 0; i < this.defaultMembers.length; i++) {
            console.log(this.defaultMembers[i]);
            // console.log(memberList.push(...this.defaultMembers[i]));
            memberList = this.defaultMembers;
          }
          this.memberList = memberList;
          console.log(this.memberList);


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

        // Filter out the selected member from the memberList for the selected date
    // this.memberList = this.defaultMembers.filter(member => {
    //   // Check if the member is available for the selected date and not the selected member
    //   return !this.isMemberScheduledForDate(member, date);
    // });

    // console.log(this.memberList);
      }
      
      // onClickMember() {

      //   if (this.memberList.length == 0 || this.memberList == null) {
      //     let memberList = [];
      //     for (let i = 0; i < this.defaultMembers.length; i++) {
      //       console.log(this.defaultMembers[i]);
      //       // console.log(memberList.push(...this.defaultMembers[i]));
      //       memberList = this.defaultMembers;
      //     }
      //     this.memberList = memberList;
      //     console.log(this.memberList);
    
      //   }
    
      // }

      // onSelectMember(memberId: any) {
      //   // Update selectedBaithak with member ID, baithak ID, and date
      //   this.selectedBaithak.memberId = memberId;
      // }
      onSelectMember(memberId: any) {
        this.selectedMemberId = memberId;
        this.peopleBaithak.member = memberId;
        this.peopleBaithak.baithak = this.selectedBaithakId;
        this.peopleBaithak.date = this.selectedDate;
      }
}
