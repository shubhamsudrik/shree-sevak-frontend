import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Baithak } from "src/app/Classes/baithak";
import { PeopleSchedule } from "src/app/Classes/people-schedule";
import { MemberListService } from "src/app/services/member-list.service";
import { SchedulePeopleBaithakService } from "src/app/services/schedule-people-baithak.service";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Output() valueUpdate: EventEmitter<any> = new EventEmitter();
  @Input() date: any;
  @Input() baithakId: any;
  schedule: PeopleSchedule = new PeopleSchedule();
  memberChildForm: FormGroup;
  memberList: any[] = [];
  defaultMembers: any;
  totalElements: any;

  constructor(
    private memberListService: MemberListService,
    private formBuilder: FormBuilder,
    private schedulePeopleBaithakService: SchedulePeopleBaithakService
  ) {}

  ngOnInit(): void {
    this.initializingForm();
    this.individualScheduleRecord(this.date,this.baithakId);
    this.getAllActiveMemberList();
  }

  
  individualScheduleRecord(date: any, baithakId: any) {
    throw new Error("Method not implemented.");
  }

  initializingForm() {
    this.memberChildForm = this.formBuilder.group({
      member: ["", Validators.required],
      date: [this.date],
      baithak: [this.baithakId],
    });
  }

  onSelectMember(value: any) {
    // throw new Error('Method not implemented.');
    this.schedule.baithak = this.baithakId;
    this.schedule.date = this.date;
    this.schedule.member = value;

    this.valueUpdate.emit(this.schedule);
  }
  private getAllActiveMemberList() {
    this.memberListService.getMemberList().subscribe((data: any) => {
      console.log(data);
      console.log(data.content);
      console.log(data.length);
      // for (let i = 0; i < data.length; i++){
      this.defaultMembers = data;
      const updatedmemberList = this.defaultMembers.map((member) => {
        member.baithak = this.baithakId;
        member.date = this.date;
        return member;
      });
      console.log(updatedmemberList)

      this.schedulePeopleBaithakService.setMembers(updatedmemberList);
      this.totalElements = data.totoalElement;
      // }
      console.log(this.defaultMembers);
      console.log("data.totalElements", this.totalElements);
      this.memberList = this.schedulePeopleBaithakService.getMembers(this.baithakId);
    });
  }
  loadMemberList() {
    this.getAllActiveMemberList();
    //this.memberList = this.schedulePeopleBaithakService.getMembers(this.baithakId);
  }
  
}
