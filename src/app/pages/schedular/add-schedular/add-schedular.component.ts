import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberListService } from 'src/app/services/member-list.service';
import { Schedule } from 'src/app/Classes/schedule';
import { ScheduleDataService } from 'src/app/services/schedule-data.service';
import { LocationDataService } from 'src/app/services/location-data.service';
import { Member } from 'src/app/Classes/member';
import { Location } from 'src/app/Classes/location';


@Component({
  selector: 'app-add-schedular',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  template: `<ejs-schedule> </ejs-schedule>`,
  // templateUrl: './add-schedular.component.html',
  // styleUrls: ['./add-schedular.component.css']
})
export class AddSchedularComponent implements OnInit {

    scheduleform: FormGroup;
    submitted = false;
    defaultMembers: Member[] = [];
    defaultSchedule: Schedule[] = [];
    defaultlocations: Location[] = [];
    Schedule: Schedule = new Schedule();
    id: number;
    showTable = false;
    searchText: any;
    
  
    constructor(
      private ScheduledataService: ScheduleDataService,
      private memberListService : MemberListService,
      private locationDataService: LocationDataService,
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
  
    ) {
      
    }
  
    ngOnInit(): void {
     

      this.id = this.route.snapshot.params['id'];
      this.ScheduledataService.getScheduleById(this.id).subscribe({
        next: (data) => {
          this.Schedule = data;
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  
      // Validatons
      this.scheduleform = this.formBuilder.group({
          baithakType: ['',Validators.required ],
          dayOfWeek: ['',Validators.required],
          fromTime: ['',Validators.required],
          status: ['',Validators.required],
          toTime: ['',Validators.required],
          hajeriGhenara: ['',Validators.required],
          vachanGhenara: ['',Validators.required],
          locations: ['',Validators.required]
      },
      { validator: this.compareFieldsValidator }
      
      );
  
      this.getMembers();
      this.getLocations();
    }

  
// compare hajerighenara === vachanghenara
 compareFieldsValidator(formGroup: FormGroup) {
  const field1Value = formGroup.get('hajeriGhenara').value;
  const field2Value = formGroup.get('vachanGhenara').value;

  if (field1Value === field2Value) {
    
    return { sameValue: true };
   
  }

  return null;
}

// Gender check

compareGender(formGroup: FormGroup){
  const field1Value = formGroup.get('member.gender').value;
  const field2Value = formGroup.get('vachanGhenara').value;

 if (field1Value === field2Value) {
    return { sameValue: true };
  }

  return null;
}



  
    get scheduleFormControl() {
      return this.scheduleform.controls;
    }
  
    onsubmit1() {
      this.submitted = true;
      if (this.scheduleform.valid) {
        return;
      }
      alert('unsuccessful');
    }
  
    onSubmit() {
      this.submitted = true;
  
      const isDuplicate = this.isDuplicateData(this.Schedule);
 

      if (isDuplicate) {
        // Data already exists error message
        alert(
          'Data already exists with the same city, state, and division.'
        );
      } 
      
      else if (this.scheduleform.valid) {
        // Data doesn't exist and the form is valid, save the Member
        console.log(this.Schedule);
        this.saveMember();
      } else {
        alert('Please fill all fields: कृपया सर्व फील्ड भरा');
      }
    }
  
    saveMember() {
      this.ScheduledataService.setAllData(this.Schedule).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/schedular']);
        },
        (error) => console.log(error)
      );
    }
  
    CancelChanges() {
      this.router.navigate(['/member-list']);
    }
  
    Clear() {
      this.scheduleform.reset();
    }
  
    // getting member data
    getMembers() {
      this.memberListService.getMemberList().subscribe(
        (data: Member[]) => {
          this.defaultMembers = data;
          console.log(this.defaultMembers);
          console.log(this.defaultlocations);
        },
        (error) => {
          console.error('Error fetching Members:', error);
        }
      );
    }

     // getting location data
     getLocations() {
      this.locationDataService.getLocationList().subscribe(
        (data: Location[]) => {
          this.defaultlocations = data;
          console.log(this.defaultlocations);
        },
        (error) => {
          console.error('Error fetching Locations:', error);
        }
      );
    }
  
  
    
  
    isDuplicateData(newMember: Schedule): boolean {
      for (let item of this.defaultSchedule) {
        if (
          
          // item.city === newMember.city &&
          item.baithakType === newMember.baithakType 
          // item.email === newMember.email &&
          // item.mobile === newMember.mobile &&
          // item.addharNumber === newMember.addharNumber 
          // item.division === newMember.division 
          // item.id !== newMember.MemberId
        ) {
          return true; // Data already exists
        }
      }
      return false; // Data does not exist
    }
  }
  