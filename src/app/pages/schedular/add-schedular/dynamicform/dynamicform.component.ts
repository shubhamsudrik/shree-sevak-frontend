import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Member } from "src/app/Classes/member";
import { ScheduleDto } from "src/app/Classes/schedule-dto";

@Component({
  selector: "app-dynamicform",
  templateUrl: "./dynamicform.component.html",
  styleUrls: ["./dynamicform.component.css"],
})
export class DynamicformComponent implements OnInit {
  @Output() valueChanged: EventEmitter<ScheduleDto> = new EventEmitter();
  @Input() locationId: any;

  @Input() date: any;
  @Input() baithakId: any;

  schedularFormchild: FormGroup;

  scheduleDto: ScheduleDto = new ScheduleDto();

  @Input() members: Member[] = [];
  @Input() hajeriMembers: Member[] ;
  @Input() vachanMembers: Member[] ;
  backuphajeriMembers: Member[] ;
  backupvachanMembers: Member[] ;
  priviousMember
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.initializingForm();
   
    this.schedularFormchild.valueChanges.subscribe(() => {
      console.log(this.scheduleDto);
      this.scheduleDto.baithakId = +this.baithakId;
      this.scheduleDto.locationId = +this.locationId;
      this.scheduleDto.date = this.date;
      this.valueChanged.emit(this.scheduleDto);
    });
    console.log(this.scheduleDto);
  }
  initializingForm() {
    this.schedularFormchild = this.formBuilder.group({
      locationId: [this?.locationId, Validators.required],

      baithakId: [this?.baithakId, Validators.required],

      hajeriGhenara: [this?.hajeriMembers, Validators.required],
      vachanGhenara: [this?.vachanMembers, Validators.required],
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

  initialiseMemebersOnType(): void {
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