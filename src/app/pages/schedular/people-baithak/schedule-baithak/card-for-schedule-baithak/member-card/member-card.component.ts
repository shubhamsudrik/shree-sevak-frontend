import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PeopleSchedule } from "src/app/Classes/people-schedule";
import { MemberListService } from "src/app/services/member-list.service";
import { SchedulePeopleBaithakService } from "src/app/services/schedule-people-baithak.service";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Output() valueUpdate: EventEmitter<any> = new EventEmitter();
  @Input() date: any;
  @Input() baithakId: any;
  @Input() selectedLocations:any;

  schedule: PeopleSchedule = new PeopleSchedule();
  memberChildForm: FormGroup;
  memberList: any[] = [];
  defaultMembers: any;
  totalElements: any;
  memberSelected: any;
  scheduleList: any[];
  scheduleDates: any[];
  scheduleLocation: any;
  filteredMembers: any[] = []; // Initialize filteredMembers array
  allmemberList: any[];

  constructor(
    private memberListService: MemberListService,
    private formBuilder: FormBuilder,
    private schedulePeopleBaithakService: SchedulePeopleBaithakService,
    private cdr: ChangeDetectorRef
  ) {
    console.log(this.selectedLocations);
  }

  ngOnInit(): void {
    this.initializingForm();
    this.getAllpeopleScheduleList().subscribe(() =>{
      this.getAllActiveMemberList();
      this.getAllActiveMemberList1();

    });
  }

  individualScheduleRecord(date: any, baithakId: any) {
    this.schedulePeopleBaithakService
      .getIndividulaScheduleByDateAndBaithakId(date, baithakId)
      .subscribe((data) => {
        console.log("individual schedule record", data);
        let member = data.member;
        member.baithak = this.baithakId;
        member.date = this.date;
        this.memberSelected = member;
        console.log("memberSelected", this.memberSelected);
        this.schedulePeopleBaithakService.addMemeberToSchedule(this.memberSelected);
        console.log(this.memberSelected);
        this.memberChildForm.patchValue({
          member: this.memberSelected.memberId,
        });
      });
  }

  initializingForm() {
    this.memberChildForm = this.formBuilder.group({
      member: ["", Validators.required],
      date: [this.date],
      baithak: [this.baithakId],
    });
  }

  onSelectMember(value: any) {
    this.schedule.baithak = this.baithakId;
    this.schedule.date = this.date;
    this.schedule.member = value;
    this.valueUpdate.emit(this.schedule);
  }

  private getAllpeopleScheduleList() {
    return this.schedulePeopleBaithakService.getAllpeopleScheduleList().pipe(
      switchMap((data: any[]) => {
        this.scheduleList = data;
        console.log(this.scheduleList);
  
        this.scheduleDates = this.scheduleList.map(item => item.date);
        console.log(this.scheduleDates );
  
        this.scheduleLocation = this.scheduleList.map(item => item.baithak.location.locationId);
        console.log("previous selectedLocations "+this.scheduleLocation);
  
        return of(null); // Emitting null to signify completion
      })
    );
  }

  private getAllActiveMemberList() {
    this.memberListService.getMemberList().subscribe((data: any) => {
      this.defaultMembers = data;

      if (this.scheduleList && this.scheduleList.length > 0) {
        this.filteredMembers = this.defaultMembers.filter(member => {
          return !this.scheduleList.some(schedule => schedule.member.memberId === member.memberId);
        });
      } else {
        this.filteredMembers = this.defaultMembers.slice();
      }

      this.updateDropdownOptions(this.filteredMembers);
    });
  }

  private updateDropdownOptions(options: any[]): void {
    this.memberChildForm.controls['member'].setValue(null);
    this.memberList = [];
    this.memberList = options;
  }

  private getAllActiveMemberList1() {
    this.memberListService.getMemberList().subscribe((data: any) => {

      this.defaultMembers = data;
      const updatedmemberList = this.defaultMembers.map((member) => {
        member.baithak = this.baithakId;
        member.date = this.date;
        return member;
      });
      console.log(updatedmemberList);

      this.schedulePeopleBaithakService.setMembers(updatedmemberList);
      this.totalElements = data.totoalElement;
      console.log(this.defaultMembers);

      this.allmemberList = this.schedulePeopleBaithakService.getMembers(
        this.baithakId
      );
      this.individualScheduleRecord(this.date, this.baithakId);
    });
  }

  loadMemberList() {
    // this.getAllActiveMemberList();
    this.initializingForm();
    this.getAllpeopleScheduleList().subscribe(() =>{
      this.getAllActiveMemberList();
      this.getAllActiveMemberList1();

    });
  }
}
