import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { pairwise, startWith } from "rxjs";
import { Member } from "src/app/Classes/member";
import { Schedule } from "src/app/Classes/schedule";
import { ScheduleDto } from "src/app/Classes/schedule-dto";
import { ScheduleDataService } from "src/app/services/schedule-data.service";

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
  @Input() hajeriMembers: Member[];
  @Input() vachanMembers: Member[];
  @Input() allMembers: Member[];

  updateSchedule: Schedule;

  reloadHajeri: boolean = false;
  reloadChild: boolean = false;
  readerVachan: any;

  constructor(
    private formBuilder: FormBuilder,
    private schedularService: ScheduleDataService,
    private toast: ToastrService
  ) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");

    this.initializingForm();
    // this.individualScheduleRecord(this.date, this.locationId, this.baithakId);

    this.schedularFormchild.valueChanges.subscribe(() => {
      console.log(this.scheduleDto);

      // this.scheduleDto.scheduleId = this.updateSchedule.scheduleId;
      this.scheduleDto.vachanGhenara = +this.scheduleDto?.vachanGhenara;
      this.scheduleDto.hajeriGhenara = +this.scheduleDto?.hajeriGhenara;

      this.scheduleDto.baithakId = +this.baithakId;

      this.scheduleDto.locationId = +this.locationId;

      this.scheduleDto.date = this.date;

      this.valueChanged.emit(this.scheduleDto);
    });
  }

  initializingForm() {
    this.schedularFormchild = this.formBuilder.group({
      locationId: ["", Validators.required],

      baithakId: ["", Validators.required],
      hajeriGhenara: ["", Validators.required],

      vachanGhenara: ["", Validators.required],
      status: ["", Validators.required],
      date: ["", Validators.required],
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

  initialiseMemebersOnType(): void {
    // this.hajeriMembers = this.members.filter((member: Member) => {
    //   if (member.hajeriNo === "1") {
    //     return member;
    //   }
    // });
    // this.vachanMembers = this.members.filter((member: Member) => {
    //   if (member.hajeriNo === "2") {
    //     return member;
    //   }
    // });
    // console.log(this.hajeriMembers);
    // console.log(this.vachanMembers);
  }

  submitChildForm() {
    console.log(this.schedularFormchild.value);
    this.schedularFormchild.value;
  }

  /////////////////////////////////

  individualScheduleRecord(
    date: string,
    locationId: number,
    baithakId: number
  ): void {
    this.schedularService
      .getscheduleByDateAndLocationBaithak(date, locationId, baithakId)
      .subscribe(
        (data: Schedule) => {
          console.log(data);

          this.updateSchedule = data;
          this.scheduleDto.scheduleId = +this.updateSchedule.scheduleId;
          this.scheduleDto.baithakId = +this.updateSchedule.baithak.bithakId;
          this.scheduleDto.hajeriGhenara =
            +this.updateSchedule?.members[0]?.memberId;

          this.scheduleDto.vachanGhenara =
            +this.updateSchedule?.members[1]?.memberId;

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
  currentDate() {
    console.log(this.date);
    return this.date;
  }

  vachanMemberChange(memberId: any) {
    console.log("click event generated");
    console.log(memberId);

    const vachanMember = {
      memberId: +memberId,
      locationId: this.locationId,
      baithakId: this.baithakId,
      date: this.date,
    };
    console.log(vachanMember);
    const isVachanMember =
      this.schedularService.validateVachanMember(vachanMember);
    this.vachanMembers = this.schedularService.getMembers();
    if (this.vachanMembers.length === 0) {
      this.toast.warning("All members assigned");
    }
    if (!isVachanMember) {
      this.toast.error("VachanMember All ready Selected for this date ");
    } else {
      this.schedularService.addMembersToSchduleVachanGhenara(vachanMember);

      // const selectedVachanMembers = this.schedularService.schduleVachanmember;
      // const vachanMemberIdsToRemove = selectedVachanMembers.map((member) => member.memberId);

      // this.allMembers = this.schedularService.serviceDefaultMember.filter((member) => !vachanMemberIdsToRemove.includes(member.memberId));
      // this.schedularService.setMembers(this.allMembers)
    }
  }
  hajeriMemberChange(memberId: any) {
    console.log("click event generated");
    console.log(memberId);

    const hajeriMember = {
      memberId: +memberId,
      locationId: this.locationId,
      baithakId: this.baithakId,
      date: this.date,
    };

    const isHajeriMember =
      this.schedularService.validateHajerimember(hajeriMember);
    console.log(isHajeriMember);
    this.hajeriMembers = this.schedularService.getMembers();
    if (this.hajeriMembers.length == 0) {
      this.toast.warning("all members have been assigned");
    }
    if (!isHajeriMember) {
      this.toast.error("hajeriMember all ready selected for this Date ");
    } else {
      this.schedularService.addMembersToSchduleHajeriGhenara(hajeriMember);

      //   const selectedHajeriMembers= this.schedularService.schduleHajeriMember;
      //   const hajeriMemberIdsToRemove = selectedHajeriMembers.map((member) => member.memberId);

      //   this.allMembers =this.schedularService.serviceDefaultMember.filter((member) => !hajeriMemberIdsToRemove.includes(member.memberId));
      //   this.schedularService.setMembers(this.allMembers)
      // }
    }
  }
}
// reloadChild() {
//   this.vachanMembers = this.schedularService.getMembers();

//   // if (!this.reload) {
//   //   this.reload = true;
//   //   this.vachanMembers = this.schedularService.getMembers();
//   //   this.hajeriMembers = this.schedularService.getMembers();
//   // }
// }
