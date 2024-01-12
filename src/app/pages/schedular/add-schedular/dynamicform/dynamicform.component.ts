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
import { LocService } from "src/app/services/loc.service";
import {Location} from "src/app/Classes/location";
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
  @ViewChild("vachanSelect") vachanSelect!: ElementRef;
  @ViewChild("hajeriSelect") hajeriSelect!: ElementRef;
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
  vachanErrorMessage: string | null = null;
hajeriErrorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private schedularService: ScheduleDataService,
    private toast: ToastrService,
    private memberService: MemberListService,
    private locationService:LocService
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

  assignMemeberList() {
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
    // const memberPresent = this.schedularService.serviceDefaultMember
    // const memberPresent = this.schedularService.getMembers(
    //   this.date,
    //   this.baithakId,
    //   this.locationId
    // );
    // console.log(memberPresent)
    // if(memberPresent.length==0){
      const listOfMembers = this.allMembers.map((member) => {
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
    // }
   
  }

  updateScheduleDto() {
    this.scheduleDto.vachanGhenara =
      +this.schedularFormchild.get("vachanGhenara").value;
    this.scheduleDto.hajeriGhenara =
      +this.schedularFormchild.get("hajeriGhenara").value;
    this.scheduleDto.baithakId =
      +this.schedularFormchild.get("baithakId").value;
    this.scheduleDto.locationId =
      +this.schedularFormchild.get("locationId").value;
    this.scheduleDto.date = this.schedularFormchild.get("date").value;
  }
  initializingForm() {
    this.schedularFormchild = this.formBuilder.group({
      locationId: [this.locationId],
      baithakId: [this.baithakId],
      hajeriGhenara: [, Validators.required],
      vachanGhenara: [, Validators.required],
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

    console.log("individualScheduleRecord", date, locationId, baithakId)
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

          this.memberService
            .getMemberById(this.scheduleDto.vachanGhenara)
            .subscribe((member) => {
              console.log(member)
              this.vachanMember = member;
              (this.vachanMember.locationId = +this.locationId),
                (this.vachanMember.baithakId = +this.baithakId),
                (this.vachanMember.date = this.date);
              this.schedularService.setSingleVachanMembers(this.vachanMember);
            });

          this.memberService
            .getMemberById(this.scheduleDto.hajeriGhenara)
            .subscribe((member) => {
              console.log(member)
              this.hajeriMember = member;
              (this.hajeriMember.locationId = +this.locationId),
                (this.hajeriMember.baithakId = +this.baithakId),
                (this.hajeriMember.date = this.date);
              this.schedularService.setSingleHajeriMembers(this.hajeriMember);
            });
          this.hajeriMember = {};
          this.vachanMember = {};

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

  removeMemeberFromSelectedHajeriList(member: any) {
    console.log(member);
    if(member !=null || undefined){
      const memberIndex = this.schedularService.schduleHajeriMember.findIndex(
        (hajeriMember) => {
          return (
            hajeriMember.baithakId === +member.baithakId &&
            hajeriMember.date === member.date &&
            hajeriMember.memberId === +member.memberId
          );
        }
      );
      console.log("unselected member index in hajeri list", memberIndex);
      if (memberIndex !== -1) {
        this.schedularService.schduleHajeriMember.splice(memberIndex, 1);
      }
    }

    console.log(this.schedularService.schduleHajeriMember);
    this.hajeriMembers = this.schedularService.getMembers(
      this.date,
      this.baithakId,
      this.locationId
    );
  }

  removeMemeberFromSelectedVachanList(member: any) {
    console.log(member);
    const memberIndex = this.schedularService.schduleVachanmember.findIndex(
      (vachanMember) => {
        return (
          vachanMember.baithakId === +member.baithakId &&
          vachanMember.date === member.date &&
          vachanMember.memberId === +member.memberId
        );
      }
    );
    console.log("unselected member index in vachan list", memberIndex);
    if (memberIndex !== -1) {
      this.schedularService.schduleVachanmember.splice(memberIndex, 1);
    }
    console.log(this.schedularService.schduleVachanmember);
    this.vachanMembers = this.schedularService.getMembers(
      this.date,
      this.baithakId,
      this.locationId
    );
  }
  vachanMemberChange(memberId: number) {
    this.isListSelected = false;
    if (!this.isListSelected) {
      this.isListSelected = true;
      this.addingDateBaithakIdLocationIdToMember();
    }
    // const memberId= this.vachanSelect.nativeElement.value;

    console.log(this.vachanMembers);
    console.log("click event generated");
    console.log(memberId);
  
    // this.vachanMembers.find((value) => {
    //   if (value.memberId === memberId) {
    //     this.vachanMember = value;
    //     this.vachanMember.locationId = +this.locationId;
    //     this.vachanMember.baithakId = +this.baithakId;
    //     this.vachanMember.date = this.date;
    //     console.log(this.vachanMember);
    //   }
    // });

    this.memberService.getMemberById(memberId).subscribe((member) => {
      this.vachanMember = member;
      console.log(member);
      (this.vachanMember.locationId = +this.locationId),
        (this.vachanMember.baithakId = +this.baithakId),
        (this.vachanMember.date = this.date);
      console.log(this.vachanMember);

      // const isVachanMember = this.schedularService.validateMember(
      //   this.vachanMember
      // );

      console.log(this.vachanMembers);
      this.validateGenderAssignment(this.vachanMember,this.locationId);
      this.removeMemeberFromSelectedVachanList(this.vachanMember);
   
      // const isNotSimmilerGender: boolean =
      // if (!isNotSimmilerGender) {
      //   this.toast.warning("Male and Female can not assigned together");
      // }

      this.schedularService.addMembersToSchduleVachanGhenara(this.vachanMember);

      // if (this.vachanMembers.length === 0) {
      //   this.toast.warning("All members assigned");
      // }
      // if (!isVachanMember) {
      //   // this.toast.error("Member all ready assign ");
      //   this.removeMemeberFromSelectedVachanList(this.vachanMember);
      // } else {
      //   this.schedularService.addMembersToSchduleVachanGhenara(
      //     this.vachanMember
      //   );

      //   // const selectedVachanMembers = this.schedularService.schduleVachanmember;
      //   // const vachanMemberIdsToRemove = selectedVachanMembers.map((member) => member.memberId);

      //   // this.allMembers = this.schedularService.serviceDefaultMember.filter((member) => !vachanMemberIdsToRemove.includes(member.memberId));
      //   // this.schedularService.setMembers(this.allMembers)
      // }

     

     
      console.log(this.vachanMember);
    },error => {
      this.vachanMembers = this.schedularService.getMembers(
        this.date,
        this.baithakId,
        this.locationId
      );
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
    this.isListSelected = false;
    if (!this.isListSelected) {
      this.isListSelected = true;
      this.addingDateBaithakIdLocationIdToMember();
    }

    console.log(this.hajeriMembers);
    // const memberId = this.hajeriSelect.nativeElement.value;
    console.log("click event generated");
    console.log(memberId);
   

    this.memberService.getMemberById(memberId).subscribe((member) => {
      this.hajeriMember = member;
      (this.hajeriMember.locationId = +this.locationId),
        (this.hajeriMember.baithakId = +this.baithakId),
        (this.hajeriMember.date = this.date);
      console.log(this.hajeriMember);
      // const isHajeriMember = this.schedularService.validateMember(
      //   this.hajeriMember
      // );
      // console.log(isHajeriMember);

      console.log(this.hajeriMembers);
      this.validateGenderAssignment(this.hajeriMember,+this.locationId);
      this.removeMemeberFromSelectedHajeriList(this.hajeriMember);
    
      // const isNotSimmilerGender: boolean =
      // if (!isNotSimmilerGender) {
      //   this.toast.warning("Male and Female are not assigned to gether");
      // }
      this.schedularService.addMembersToSchduleHajeriGhenara(this.hajeriMember);

      

  
      console.log(this.hajeriMember);
    },error => {
      this.hajeriMembers = this.schedularService.getMembers(
        this.date,
        this.baithakId,
        this.locationId
      );
    });

 

  }
  change() {
    // this.schedularFormchild.reset();
  }
  locationBaseGenderSelection(arg0: any) {
    throw new Error('Method not implemented.');
    }
  get MemberControls(){
    return this.schedularFormchild.controls
  }

  /**
   * 
   * @param member 
   * @param locationId 
   */

 
  validateGenderAssignment(member: any,locationId:number) {
  
    this.locationService.getLocationById(locationId).subscribe((loc:any)=>{
      const mixedGenderAllow = loc.mixedGenderAllow
      const genderAllowed=loc.genderAllowed
      console.log(loc.mixedGenderAllow)
      const assignedHajeriMembersSameLocation = this.schedularService.schduleHajeriMember.find((value) => {
        return (
          value.date === member.date &&
          value.baithakId === +member.baithakId &&
          value.locationId === +member.locationId
        );
      });
      const assignedVachanMembersSameLocation:Member = this.schedularService.schduleVachanmember.find((value) => {
        return (
          value.date === member.date &&
          value.baithakId === +member.baithakId &&
          value.locationId === +member.locationId
        );
      });
       

      if(!mixedGenderAllow){
        if (assignedHajeriMembersSameLocation && member.gender !== assignedHajeriMembersSameLocation.gender) {
          // Show error or handle the case where the selected gender doesn't match the assigned Hajeri member's gender
          this.toast.error('Selected gender does not match the assigned Hajeri member\'s gender');
      
        }
  
        if (assignedVachanMembersSameLocation && member.gender !== assignedVachanMembersSameLocation.gender) {
          // Show error or handle the case where the selected gender doesn't match the assigned Vachan member's gender
          this.toast.error('Selected gender does not match the assigned Vachan member\'s gender');
    
        }

      }
//    if(genderAllowed==="Male"){  

//        if (!(assignedVachanMembersSameLocation.gender === "Male")) {
//         this.vachanErrorMessage = "Only Male Vachan Member Allow for this location";
//         this.toast.error("Only Male Vachan Member for this location");
//       } else {
//         this.vachanErrorMessage = null; // Reset error message if validation passes
//       }


//        if(!(assignedHajeriMembersSameLocation.gender==="Male")){
         
//        }
//        if (!(assignedHajeriMembersSameLocation.gender === "Male")) {
//         this.hajeriErrorMessage = "Only Male hajeri Member Allow for this location";
//         this.toast.error("Only Male hajeri Member Allow for this location");
//       } else {
//         this.hajeriErrorMessage = null; // Reset error message if validation passes
//       }

//    }else if(genderAllowed==="Female"){
//   //   if(!(assignedVachanMembersSameLocation.gender==="Female")){
//   //     this.toast.error("Only Female Vachan Member Allowed");
//   //  }
//   //   if(!(assignedHajeriMembersSameLocation.gender==="Female" )){
//   //     this.toast.error("Only Female Hajeri Member for this location");
//   //  }
 

//    if (!(assignedVachanMembersSameLocation.gender === "Female")) {
//     this.vachanErrorMessage = "Only Female Vachan Member for this location";
//     this.toast.error("Only Female Vachan Member for this location");
//   } else {
//     this.vachanErrorMessage = null; // Reset error message if validation passes
//   }
//   if (!(assignedHajeriMembersSameLocation.gender === "Female")) {
//     this.hajeriErrorMessage = "Only Female Hajeri Member for this location";
//     this.toast.error("Only Female Hajeri Member for this location");
//   } else {
//     this.hajeriErrorMessage = null; // Reset error message if validation passes
//   }
//   }
 
  
//       // Check if assigning both male and female for the same date, baithak ID, and location ID
//       // const isMaleAssigned = assignedMembersSameLocation.some((value) => value.gender === 'Male');
//       // const isFemaleAssigned = assignedMembersSameLocation.some((value) => value.gender === 'Female');
  
//     //   if ((isMaleAssigned && member.gender === 'Female') || (isFemaleAssigned && member.gender === 'Male')) {
//     //     return false; // Both male and female cannot be assigned together
//     //   }
  
//     //   return true; // Validation successful, member can be assigned
//     })
// }
})}}

// reloadChild() {
//   this.vachanMembers = this.schedularService.getMembers();

//   // if (!this.reload) {
//   //   this.reload = true;
//   //   this.vachanMembers = this.schedularService.getMembers();
//   //   this.hajeriMembers = this.schedularService.getMembers();
//   // }
// }
