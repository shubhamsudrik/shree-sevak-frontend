import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { log } from "console";
import { ToastrService } from "ngx-toastr";
import { pairwise, startWith } from "rxjs";
import { Member } from "src/app/Classes/member";
import { Schedule } from "src/app/Classes/schedule";
import { ScheduleDto } from "src/app/Classes/schedule-dto";
import { MemberListService } from "src/app/services/member-list.service";
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
  @ViewChild('vachanSelect') vachanSelect!: ElementRef;
  @ViewChild('hajeriSelect') hajeriSelect!: ElementRef;
  schedularFormchild: FormGroup;

  scheduleDto: ScheduleDto = new ScheduleDto();

  @Input() members: Member[] = [];
  @Input() hajeriMembers: any[];
  @Input() vachanMembers: any[];
  @Input() allMembers: Member[];

  updateSchedule: Schedule;

  reloadHajeri: boolean = false;
  reloadChild: boolean = false;
  readerVachan: any;
  hajeriMember: any;
  vachanMember: any;
  isListSelected: boolean = false;
  schedulePresent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private schedularService: ScheduleDataService,
    private toast: ToastrService,
    private memberService: MemberListService
  ) {}
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");

    this.initializingForm();
    this.individualScheduleRecord(this.date, this.locationId, this.baithakId);

    this.schedularFormchild.valueChanges.subscribe(() => {
      console.log(this.scheduleDto);
      if (this.schedularFormchild.valid) {
        this.updateScheduleDto();
        this.valueChanged.emit(this.scheduleDto);
      }
    });

  }


  assignMemeberList(){
    this.hajeriMembers = this.schedularService.getMembers(
      this.date,
      this.baithakId,
      this.locationId
    );
    this.vachanMembers = this.schedularService.getMembers(
      this.date,
      this.baithakId,
      this.locationId
    );
  }
  addingDateBaithakIdLocationIdToMember() {
    this.schedularService.setMembersLength(this.allMembers.length);
    const listOfMembers = this.hajeriMembers.map((member) => {
      this.hajeriMember = member;
      (this.hajeriMember.locationId = +this.locationId),
        (this.hajeriMember.baithakId = +this.baithakId),
        (this.hajeriMember.date = this.date);
      console.log(this.hajeriMember);
      return this.hajeriMember;
    });
    this.hajeriMember = {};
    console.log(listOfMembers);
    this.schedularService.setMembers(listOfMembers);
  }


  updateScheduleDto() {
    this.scheduleDto.vachanGhenara = +this.schedularFormchild.get('vachanGhenara').value;
    this.scheduleDto.hajeriGhenara = +this.schedularFormchild.get('hajeriGhenara').value;
    this.scheduleDto.baithakId = +this.schedularFormchild.get('baithakId').value;
    this.scheduleDto.locationId = +this.schedularFormchild.get('locationId').value;
    this.scheduleDto.date = this.schedularFormchild.get('date').value;
  }
  initializingForm() {
    this.schedularFormchild = this.formBuilder.group({
      locationId: [this.locationId ],
      baithakId: [this.baithakId ],
      hajeriGhenara: [],
      vachanGhenara: [],
      status: [""],
      date: [this.date],
    });
  }

  // initializingForm() {
  //   this.schedularFormchild = this.formBuilder.group({
  //     locationId: ["", Validators.required],

  //     baithakId: ["", Validators.required],
  //     hajeriGhenara: ["", Validators.required],

  //     vachanGhenara: ["", Validators.required],
  //     status: ["", Validators.required],
  //     date: ["", Validators.required],
  //     // scheduleForms: this.formBuilder.array([
  //     //   this.formBuilder.group({
  //     //     locationId: ["", Validators.required],

  //     //     baithakId: ["", Validators.required],

  //     //     hajeriGhenara: ["", Validators.required],
  //     //     vachanGhenara: ["", Validators.required],
  //     //     status: ["", Validators.required],

  //     //     date: ["", Validators.required],
  //     //   }),
  //     // ]),
  //   });
  // }


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
            +this.updateSchedule?.members[1]?.memberId;

          this.scheduleDto.vachanGhenara =
            +this.updateSchedule?.members[0]?.memberId;
            
            this.memberService.getMemberById(this.scheduleDto.vachanGhenara).subscribe((member) => {
             this.vachanMember = member;
             this.vachanMember.locationId = +this.locationId,
             this.vachanMember.baithakId = +this.baithakId,
             this.vachanMember.date = this.date;
             this.schedularService.setSingleVachanMembers(this.vachanMember);
            })

            this.memberService.getMemberById(this.scheduleDto.hajeriGhenara).subscribe((member) => {
             this.hajeriMember = member;
             this.hajeriMember.locationId = +this.locationId,
             this.hajeriMember.baithakId = +this.baithakId,
             this.hajeriMember.date = this.date;
             this.schedularService.setSingleHajeriMembers(this.hajeriMember);
            })
            this.hajeriMember={};
            this.vachanMember={}; 
          
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

  vachanMemberChange(memberId:number) {
    
    // const memberId= this.vachanSelect.nativeElement.value;
    this.vachanMembers = this.schedularService.getMembers(
      this.date,
      this.baithakId,
      this.locationId
    );
    console.log(this.vachanMembers)
    console.log("click event generated");
    console.log(memberId);

    if (!this.isListSelected) {
      this.isListSelected = true;
      this.addingDateBaithakIdLocationIdToMember();
    }
    // this.vachanMembers.find((value) => {
    //   if (value.memberId === memberId) {
    //     this.vachanMember = value;
    //     this.vachanMember.locationId = +this.locationId;
    //     this.vachanMember.baithakId = +this.baithakId;
    //     this.vachanMember.date = this.date;
    //     console.log(this.vachanMember);
    //   }
    // });

    this.memberService
      .getMemberById(memberId)
      .subscribe((member) => {
        this.vachanMember = member;
        console.log(member);
        (this.vachanMember.locationId = +this.locationId),
          (this.vachanMember.baithakId = +this.baithakId),
          (this.vachanMember.date = this.date);
        console.log(this.vachanMember);

        const isVachanMember = this.schedularService.validateMember(
          this.vachanMember
        );
       
        console.log(this.vachanMembers);
        // if (this.vachanMembers.length === 0) {
        //   this.toast.warning("All members assigned");
        // }
        if (!isVachanMember) {
          this.toast.error("Member all ready assign ");
        } else {
          this.schedularService.addMembersToSchduleVachanGhenara(this.vachanMember);
    
          // const selectedVachanMembers = this.schedularService.schduleVachanmember;
          // const vachanMemberIdsToRemove = selectedVachanMembers.map((member) => member.memberId);
          
          // this.allMembers = this.schedularService.serviceDefaultMember.filter((member) => !vachanMemberIdsToRemove.includes(member.memberId));
          // this.schedularService.setMembers(this.allMembers)
        }
    
        // const vachanMember = {
        //   memberId: +memberId,
        //   locationId: this.locationId,
        //   baithakId: this.baithakId,
        //   date: this.date,
        // };
        console.log(this.vachanMember);
      });
    // const member = this.allMembers.find((member) => {
    //   if (member.memberId === +memberId) {
    //     this.vachanMember = member;
    //     console.log(member);
    //     this.vachanMember.locationId = +this.locationId,
    //       this.vachanMember.baithakId = +this.baithakId,
    //       this.vachanMember.date = this.date;
    //     console.log(this.vachanMember);
    //     return this.vachanMember;
    //   }
    // });
  
  }


  hajeriMemberChange(memberId: number) {
    this.hajeriMembers = this.schedularService.getMembers(
      this.date,
      this.baithakId,
      this.locationId
    );
console.log(this.hajeriMembers);
    // const memberId = this.hajeriSelect.nativeElement.value;
    console.log("click event generated");
    console.log(memberId);

    if (!this.isListSelected) {
      this.isListSelected = true;
      this.addingDateBaithakIdLocationIdToMember();
    }

    this.memberService
      .getMemberById(memberId)
      .subscribe((member) => {
        this.hajeriMember = member;
        (this.hajeriMember.locationId = +this.locationId),
          (this.hajeriMember.baithakId = +this.baithakId),
          (this.hajeriMember.date = this.date);
        console.log(this.hajeriMember);
        const isHajeriMember = this.schedularService.validateMember(
          this.hajeriMember
        );
        console.log(isHajeriMember);
   
        console.log(this.hajeriMembers);
        // if (this.hajeriMembers.length == 0) {
        //   this.toast.warning("all members have been assigned");
        // }
        if (!isHajeriMember) {
          this.toast.error("Member all ready assign ");
        } else {
          this.schedularService.addMembersToSchduleHajeriGhenara(this.hajeriMember);
    
          //   const selectedHajeriMembers= this.schedularService.schduleHajeriMember;
          //   const hajeriMemberIdsToRemove = selectedHajeriMembers.map((member) => member.memberId);
    
          //   this.allMembers =this.schedularService.serviceDefaultMember.filter((member) => !hajeriMemberIdsToRemove.includes(member.memberId));
          //   this.schedularService.setMembers(this.allMembers)
          // }
        }
    
        // const hajeriMember = {
        //   memberId: +memberId,
        //   locationId: this.locationId,
        //
        // };
        console.log(this.hajeriMember);
      });
    // this.hajeriMembers.find((member) => {
    //   if (member.memberId === memberId) {
    //     this.hajeriMember = member;
    //     this.hajeriMember.locationId = +this.locationId,
    //       this.hajeriMember.baithakId = +this.baithakId,
    //       this.hajeriMember.date = this.date
    //     console.log(this.hajeriMember);
    //   }
    // });
    // const member = this.allMembers.find((member) => {
    //   if (member.memberId === +memberId) {
    //     this.hajeriMember = member;
    //     console.log(member);
    //     this.hajeriMember.locationId = +this.locationId,
    //       this.hajeriMember.baithakId = +this.baithakId,
    //       this.hajeriMember.date = this.date;
    //     console.log(this.hajeriMember);
    //     return this.hajeriMember;
    //   }
    // });

    
  }
  change() {
    // this.schedularFormchild.reset();
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
