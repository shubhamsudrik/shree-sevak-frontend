import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleBaithak } from 'src/app/Classes/people-baithak';
import { DaysService } from 'src/app/services/days.service';
import { LocService } from 'src/app/services/loc.service';
import { PepoleBaithakService } from 'src/app/services/pepole-baithak.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/Classes/user';
import { ToastrService } from 'ngx-toastr';
import { PepoleBaithak } from 'src/app/Classes/pepole-baithak';
import { PeopleSchedule } from 'src/app/Classes/people-schedule';
import { SchedulePeopleBaithakService } from 'src/app/services/schedule-people-baithak.service';

export class CalendarDay {
  public date: Date;
  public dayName: string;

  constructor(d: Date, dayName: string) {
    this.date = d;
    this.dayName =dayName
  }
}
interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-schedule-baithak',
  templateUrl: './schedule-baithak.component.html',
  styleUrls: ['./schedule-baithak.component.css']
})
export class ScheduleBaithakComponent implements OnInit {

  isAdd = true;
  isUpdate = false;
  isCancel = false;
  cols: { field: string; header: string }[];
  baithakList: any[];
  submited: boolean = false;
  baithakFrom: FormGroup;
  peopleBaithak: PeopleBaithak = new PeopleBaithak();

  selectedCity: City;
  cities: { name: string; code: string; inactive: boolean }[];
  scheduleArray:PeopleSchedule[]=[]
  products: any;
  cities1: { label: string; value: string }[];
  updatedDays: { label: string; value: number }[];
  locationList: any[]=[];
  userDetails: User;
  tempLocationList: any=[];
  days: any[];
  baithakTypes: any[];
  fridaybaithakList: any[]=[];
  sundaybaithakList: any[]=[];
  tuesdaybaithakList: any[]=[];
  mondaybaithakList: any[]=[];
  wednesdaybaithakList: any[]=[];
  thursdaybaithakList: any[]=[];
  saturdaybaithakList: any[]=[];
  calendar: CalendarDay[] = [];
  weekStartDate: Date;
  userAreas: any;
  activeBaithakList: PeopleBaithak[];
  cardData: any;
  location: any;
  isDelete: boolean;
   // Variables to store dates for each day
   sundayDate: any;
   mondayDate: any;
   tuesdayDate: any;
   wednesdayDate: any;
   thursdayDate: any;
   fridayDate: any;
   saturdayDate: any;

  constructor(
    private formbuilder: FormBuilder,
    private locDataService: LocService,
    private daysService: DaysService,
    private peopleBaithakService: PepoleBaithakService,
    private toast: ToastrService,
    private schedulePeopleBaithakService:SchedulePeopleBaithakService
  ) {}

  ngOnInit(): void {
    this.weekStartDate = new Date(); // Initialize with current date
    this.populateCalendar();

    this.userAreas = JSON.parse(localStorage.getItem('userArea'));
    console.log(this.userDetails);
    this.getAllLocationBaseOnUserArea();
    this.retrunlocationlist();
    this.daysInWeek();
    this.baithakFromRecord();
    this.reloadfrom();

  }
  
  populateCalendar() {
    this.calendar = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    const currentDayIndex = this.weekStartDate.getDay();
    const daysToMonday = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
  
    const startDate = new Date(this.weekStartDate);
    startDate.setDate(startDate.getDate() - daysToMonday);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dayName = dayNames[i];
      this.calendar.push(new CalendarDay(date, dayName));

      // Store the date for each day separately
    switch (dayName) {
      case 'Monday':
        this.mondayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      case 'Tuesday':
        this.tuesdayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      case 'Wednesday':
        this.wednesdayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      case 'Thursday':
        this.thursdayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      case 'Friday':
        this.fridayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      case 'Saturday':
        this.saturdayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;      
      case 'Sunday':
        this.sundayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;  
    }
    }
    console.log(this.calendar)
    console.log(this.mondayDate)
    console.log(this.tuesdayDate)
    console.log(this.wednesdayDate)
    console.log(this.thursdayDate)
    console.log(this.fridayDate)
    console.log(this.saturdayDate)
    console.log(this.sundayDate)

  }
  onNextWeek() {
    this.weekStartDate.setDate(this.weekStartDate.getDate() + 7);
    this.populateCalendar();
  }
  onPriveWeek() {
    this.weekStartDate.setDate(this.weekStartDate.getDate() - 7);
    this.populateCalendar();
  }
  
  extractDatesFromCalendar(): Date[] {
    // Extract dates from calendar array
    return this.calendar.map(day => day.date);
  }

  loadBaithaTypes(){
    this.baithakTypes = [
      {
        type: "Gents",
        value: "Gents",
      },
      {
        type: "Ladies",
        value: "Ladies",
      },
    ];
  }
  baithakFromRecord() {
    this.baithakFrom = this.formbuilder.group({
      baithakId: [null],
      location: [null, Validators.required],
      baithakType: ["", Validators.required],
      dayOfWeek: ["", Validators.required],
      fromTime: ["", Validators.required],
      status: [""],
      toTime: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.isUpdate) {
      const baithak = this.baithakFrom.value;
      console.log(this.baithakFrom.value);
      const day = baithak.dayOfWeek;
      this.peopleBaithakService
        .updateBaithakDetails(baithak, baithak.baithakId)
        .subscribe(
          (data: any) => {
            switch (data.dayOfWeek.day) {
              case "Monday":
                const mondayIndex = this.mondaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (mondayIndex !== -1) {
                  this.mondaybaithakList[mondayIndex] = data;
                  this.mondaybaithakList = this.mondaybaithakList;
                } else {
 
                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              case "Tuesday":
                const tuesdayIndex = this.tuesdaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (tuesdayIndex !== -1) {
                  this.tuesdaybaithakList[tuesdayIndex] = data;
                } else {
                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              case "Wednesday":
                const wednesdayIndex = this.wednesdaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (wednesdayIndex !== -1) {
                  this.wednesdaybaithakList[wednesdayIndex] = data;
                  this.wednesdaybaithakList = this.wednesdaybaithakList;
                } else {

                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              case "Thursday":
                const thursdayIndex = this.thursdaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (thursdayIndex !== -1) {
                  this.thursdaybaithakList[thursdayIndex] = data;
                  this.thursdaybaithakList = this.thursdaybaithakList;
                } else {
  
                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              case "Friday":
                const fridayIndex = this.fridaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (fridayIndex !== -1) {
                  this.fridaybaithakList[fridayIndex] = data;
                  this.fridaybaithakList = this.fridaybaithakList;
                } else {

                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              case "Saturday":
                const saturdayIndex = this.saturdaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (saturdayIndex !== -1) {
                  this.saturdaybaithakList[saturdayIndex] = data;
                  this.saturdaybaithakList = this.saturdaybaithakList;
                } else {
                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              case "Sunday":
                const sundayIndex = this.sundaybaithakList.findIndex(
                  (item) => item.baithakId === data.baithakId
                );
                if (sundayIndex !== -1) {
                  this.sundaybaithakList[sundayIndex] = data;
                  this.sundaybaithakList = this.sundaybaithakList;
                } else {
                  this.ActiveBaithakListBaseOnLocation(baithak.location)
                }
                break;
              default:
                console.error("Invalid day of the week");
            }

            this.toast.success("baithak successfully updated");
          },
          (error) => {
            if(error.status===409){
              this.toast.error("Baithak All read Exists");
            }
          
          }
        );
    } if(this.isAdd) {
      const fromTimeControl = this.baithakFrom.get('fromTime');
  const toTimeControl = this.baithakFrom.get('toTime');
  const toDayOfWeek = this.baithakFrom.get('dayOfWeek');
const tobaithakType=this.baithakFrom.get('baithakType');
  if (!fromTimeControl.value || !toTimeControl.value || !tobaithakType.value || !toDayOfWeek.value) {
    // Mark both fields as touched to show errors
    fromTimeControl.markAsTouched();
    toTimeControl.markAsTouched();
    toDayOfWeek.markAsTouched()
    tobaithakType.markAsTouched()
  // Prevent the form submission
    return; // Exit the function, do not proceed with submission
  }else{
    const addBaithak = this.baithakFrom.value;
    console.log(this.baithakFrom.value);
    this.peopleBaithakService.saveBaithakDetails(addBaithak).subscribe(
      (data: any) => {
        console.log("save baithak record", data);
        switch (data.dayOfWeek.day) {
          case "Monday":
            this.mondaybaithakList.push(data);
            break;
          case "Tuesday":
            console.log("save baithak record", data);
            this.tuesdaybaithakList.push(data);
            break;
          case "Wednesday":
            this.wednesdaybaithakList.push(data);
            break;
          case "Thursday":
            this.thursdaybaithakList.push(data);
            break;
          case "Friday":
            this.fridaybaithakList.push(data);
            break;
          case "Saturday":
            this.saturdaybaithakList.push(data);
            break;
          case "Sunday":
            this.sundaybaithakList.push(data);
            break;
          default:
            console.error("Invalid day of the week");
            break;
        }
        this.toast.success("baithak successfully added");
      },
      (error) => {
        if(error.status===409){
          this.toast.error("Baithak All read Exists");
        }
      }
     
    );
  }
  }
     
  }

  retrunlocationlist() {
    // this.locationList=[...this.tempLocationList[0],...this.tempLocationList[1]]
    console.log(this.tempLocationList);
  }
  getAllLocationBaseOnUserArea() {
    const areaList = this.userAreas;
    console.log(areaList);
    this.loadBaithaTypes()

    for (let i = 0; i < areaList.length; i++) {
      this.locDataService
        .getLocationByAreaId(areaList[i].areaId)
        .subscribe((data) => {
          this.tempLocationList.push(data);
        });
    }
  }
  daysInWeek() {
    this.daysService.getWeekDays().subscribe((data) => {
      console.log(data);
      this.days = data;
    });
  }
  onClickLocation() {

    if (this.locationList.length == 0 || this.locationList == null) {
      const locationList = [];
      for (let i = 0; i < this.tempLocationList.length; i++) {
        console.log(this.tempLocationList[i]);
        console.log(locationList.push(...this.tempLocationList[i]));
      }
      this.locationList = locationList;

    }

  }

  onChangeLocation(event: any) {
    // console.log(event.target)
    // console.log(event.target.value)
    const locationId = event.value;
    this.location = this.locationList.find(location => location.locationId === locationId);
    console.log("found location",this.location)

    console.log(event.value);
    // console.log(event.target.value);
    console.log(locationId);
  //  this.baithakListBaseOnLocation(locationId)
   this.ActiveBaithakListBaseOnLocation(locationId);
    // console.log(this.locationList)
  }
  
  ActiveBaithakListBaseOnLocation(locationId:any){
    this.peopleBaithakService
      .getActiveBaithakListBaseOnLocation(locationId)
      .subscribe((data) => {
        console.log(data);
        this.baithakList = data;
        console.log(this.activeBaithakList);
        this.filtterAllDayBaithak();
      });
  }

  filtterAllDayBaithak() {
    this.sundaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Sunday";
    });
    this.mondaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Monday";
    });
    this.tuesdaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Tuesday";
    });
    this.wednesdaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Wednesday";
    });
    this.thursdaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Thursday";
    });
    this.fridaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Friday";
    });
    this.saturdaybaithakList = this.baithakList.filter((data) => {
      return data.dayOfWeek.day === "Saturday";
    });
    console.log(this.mondaybaithakList);
    console.log(this.tuesdaybaithakList);
    console.log(this.wednesdaybaithakList);
    console.log(this.thursdaybaithakList);
    console.log(this.fridaybaithakList);
    console.log(this.saturdaybaithakList);
    console.log(this.sundaybaithakList);
  }

  reloadfrom(){
    this.baithakFrom.patchValue({
      baithakId: '',
      location: '',
      baithakType:'',
      dayOfWeek: '',
      fromTime: '',
      status:'',
      toTime: '',
    });
  }
  addSchedule(schedule: any) {
    this.cardData =schedule;
    console.log("card value change",this.cardData);
    this.updateOrPushSchedule( this.cardData);


    // console.log("card data", this.cardData);
    // console.log("card event", event);
    // this.baithakFrom.patchValue({
    //   baithakId: this.cardData.baithakId,
    //   location: this.cardData.location.locationId,
    //   baithakType: this.cardData.baithakType,
    //   dayOfWeek: this.cardData.dayOfWeek.id,
    //   fromTime: this.cardData.fromTime,
    //   status: this.cardData.status,
    //   toTime: this.cardData.toTime,
    // });

    // console.log(this.cardData.status);
    this.isAdd = false;
    this.isUpdate = true;
    this.isCancel = true;
    this.isDelete =true;

  }
  cancelClick() {
    this.isAdd = true;
    this.isUpdate = false;
    this.isCancel = false;
    this.isDelete = false;
  }
  updateOrPushSchedule( newSchedule) {
    // Find the index in the scheduleArray where location, baithak, and date match

    const index = this.scheduleArray.findIndex(
      (schedule) =>
        schedule.baithak === newSchedule.baithak 
        // schedule.date === newSchedule.date
    );

    if (index !== -1) {
      // If the schedule exists, update member

      this.scheduleArray[index].member = +newSchedule.member;

    } else {
      // If the schedule doesn't exist, push the newSchedule into the array

      this.scheduleArray.push(newSchedule);
    }
    console.log("schedule Array ",this.scheduleArray)
console.log("schedule object ",newSchedule)
  }
  deleterecord(){
    const confirmation = confirm("Are you sure you want to delete?");
  if (confirmation) {
    const baithak = this.baithakFrom.value;
    console.log(this.baithakFrom.value)
     baithak.status = false;
     const a =baithak.baithakType;
     console.log(a)
     baithak.baithakType ="type"
      this.peopleBaithakService.updateBaithakDetails(baithak, this.cardData.baithakId)
      .subscribe(
        (data: any) => {
          this.toast.success("Baithak successfully deleted");
          baithak.baithakType =a;
          console.log(baithak)
          this.peopleBaithakService.updateBaithakDetails(baithak, this.cardData.baithakId)
          .subscribe(
            (data: any) => {
            }
          );
          this.isUpdate = false;
          this.isCancel = false;
          this.isAdd = true;
          this.isDelete = false;
          window.location.reload();
        },
        (error) => {
          console.error("Error deleting baithak:", error);
          this.cardData.status = true; 
          this.toast.error("Failed to delete baithak. Please try again.");
        }
      );
     
    }
  }
  scheduleCreated() {
     this.schedulePeopleBaithakService.createPeolpeSchedule(this.scheduleArray).subscribe((data)=>{
      this.toast.success("Schedule created successfully")
      console.log("schedule baithak data",data);
     })
    }
}