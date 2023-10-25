import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
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

  updateSchedule: Schedule;
  constructor(
    private formBuilder: FormBuilder,
    private schedularService: ScheduleDataService
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
      
      this.scheduleDto.baithakId = +this.baithakId;
       
      this.scheduleDto.locationId = +this.locationId;
      // this.scheduleDto.vachanGhenara =
      //   +this.updateSchedule.members[0]?.memberId;
      // this.scheduleDto.hajeriGhenara =
      //   +this.updateSchedule.members[1]?.memberId;

      this.scheduleDto.date = this.date;

      this.valueChanged.emit(this.scheduleDto);
    });
    console.log(this.scheduleDto);
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
}
