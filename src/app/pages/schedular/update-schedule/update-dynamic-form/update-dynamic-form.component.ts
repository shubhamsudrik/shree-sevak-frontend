import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { DateLocation } from "src/app/Classes/DateLocation";

import { Member } from "src/app/Classes/member";

import { Schedule } from "src/app/Classes/schedule";
import { ScheduleDto } from "src/app/Classes/schedule-dto";
import { MemberListService } from "src/app/services/member-list.service";

import { ScheduleDataService } from "src/app/services/schedule-data.service";

@Component({
  selector: "app-update-dynamic-form",
  templateUrl: "./update-dynamic-form.component.html",
  styleUrls: ["./update-dynamic-form.component.css"],
})
export class UpdateDynamicFormComponent implements OnInit {
  @Output() valueChanged: EventEmitter<ScheduleDto> = new EventEmitter();

  @Input() locationId: any;

  @Input() date: any;

  @Input() baithakId: any;
  currentMonthSchedule: Schedule[];

  schedularFormchild: FormGroup;

  scheduleDto: ScheduleDto = new ScheduleDto();

  updateSchedule: Schedule = new Schedule();

  @Input() members: Member[] = [];

  @Input() hajeriMembers: Member[];

  @Input() vachanMembers: Member[];
  @Input() scheduleArray: Schedule[] = [];
  @Input() scheduleMemeberArray: number[];
  constructor(
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,

    private schedularService: ScheduleDataService,
    private memberListService: MemberListService,
    private schedulerService: ScheduleDataService
  ) {}

  ngOnInit(): void {
    // throw new Error("Method not implemented.");

    this.baithakId = this.route.snapshot.queryParamMap.get("baithakId");
    console.log(this.baithakId);
    this.individualScheduleRecord(this.date, this.locationId, this.baithakId);
    this.initializingForm();

    this.separatingMemebersOnType();

    this.schedularFormchild.valueChanges.subscribe(() => {
      console.log(this.scheduleDto);

      this.scheduleDto.scheduleId = this.updateSchedule.scheduleId;
      this.scheduleDto.vachanGhenara = +this.scheduleDto?.vachanGhenara;
      this.scheduleDto.hajeriGhenara = +this.scheduleDto?.hajeriGhenara;

      this.scheduleDto.baithakId = +this.baithakId;

      this.scheduleDto.locationId = +this.locationId;

      this.scheduleDto.date = this.date;
      this.scheduleMemeberArray.forEach((memberids) => {
        if (memberids === +this.scheduleDto.hajeriGhenara) {
          alert(" member already selected" + memberids);
        }
        if (memberids === +this.scheduleDto.vachanGhenara) {
          alert("this member already selected" + memberids);
        }
      });

      console.log(this.scheduleArray);
      console.log(this.scheduleMemeberArray);

      // const index1= this.vachanMembers.findIndex((memebers)=>{
      //   console.log('inside wachan member list')
      // return  memebers.memberId===+this.scheduleDto.vachanGhenara

      //  })
      // const index2= this.hajeriMembers.findIndex((memebers)=>{
      //   console.log('inside hajerimembers  list')
      //   return memebers.memberId===+this.scheduleDto.hajeriGhenara
      //  })
      //  console.log(index1)
      //  if(index1 !==-1){
      //   console.log(index1)
      //  console.log( this.vachanMembers.splice(index1,1))

      //  }
      //  console.log(index2)
      //  if(index2 !==-1){
      //   console.log(index2)
      // console.log(  this.hajeriMembers.splice(index2,1));

      //  }

      this.valueChanged.emit(this.scheduleDto);
    });

    console.log(this.scheduleDto);
  }

  currentDate() {
    console.log(this.date);
    return this.date;
  }

  //get individual schedule base on location and date

  individualScheduleRecord(
    date: string,
    locationId: number,
    baithakId: number
  ) {
    this.schedularService
      .getscheduleByDateAndLocationBaithak(date, locationId, baithakId)
      .subscribe(
        (data: Schedule) => {
          console.log(data);
          this.updateSchedule = data;

          this.scheduleDto.scheduleId = this.updateSchedule.scheduleId;

          this.scheduleDto.hajeriGhenara =
            +this.updateSchedule.members[1]?.memberId;

          this.scheduleDto.vachanGhenara =
            +this.updateSchedule.members[0]?.memberId;

          this.populateForm();
        },
        (error) => console.log(error)
      );
  }

  populateForm() {
    this.schedularFormchild.patchValue({
      hajeriGhenara: this.scheduleDto.hajeriGhenara,

      vachanGhenara: this.scheduleDto.vachanGhenara,
    });
  }

  initializingForm() {
    this.schedularFormchild = this.formBuilder.group({
      locationId: [this?.locationId, Validators.required],

      baithakId: [this?.baithakId, Validators.required],

      hajeriGhenara: [this.scheduleDto?.hajeriGhenara, Validators.required],

      vachanGhenara: [this.scheduleDto?.vachanGhenara, Validators.required],

      status: ["", Validators.required],

      date: [this?.date, Validators.required],

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

  // updateFormValue() {

  //   this.schedularFormchild.patchValue({

  //     locationId: 1,

  //     baithakId: 1,

  //     vachanGhenara: null,

  //     hajeriGhenara: null,

  //     date: null,

  //   });

  // }
  //separting member
  separatingMemebersOnType(): void {
    this.hajeriMembers = this.members.filter((member: Member) => {
      if (member.hajeriNo === "1") {
        return member;
      }
    });

    this.vachanMembers = this.members.filter((member: Member) => {
      if (member.hajeriNo === "2") {
        return member;
      }
    });

    console.log(this.hajeriMembers);

    console.log(this.vachanMembers);
  }

  submitChildForm() {
    console.log(this.schedularFormchild.value);

    this.schedularFormchild.value;
  }
}
